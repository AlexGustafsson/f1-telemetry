package cli

import (
	"encoding/binary"
	"fmt"
	"net"
	"os"

	"github.com/AlexGustafsson/f1-telemetry/internal/util"
	"github.com/AlexGustafsson/f1-telemetry/telemetry"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

func ActionCollect(ctx *cli.Context) error {
	log, err := util.GetLogger(ctx)
	if err != nil {
		return err
	}

	address := ctx.String("address")
	if address == "" {
		address = "0.0.0.0:20777"
	}

	outputPath := ctx.String("output")

	printHeaders := ctx.Bool("print-headers")
	collectIncoming := printHeaders

	socket, err := net.ListenPacket("udp", address)
	if err != nil {
		log.Fatal("Failed to listen for incoming packets", zap.Error(err))
	}
	defer socket.Close()

	output, err := os.OpenFile(outputPath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		log.Fatal("Failed to open output", zap.Error(err))
	}
	defer output.Close()

	var incoming chan []byte
	if collectIncoming {
		incoming = make(chan []byte, 100)
	}

	if collectIncoming {
		go func() {
			for {
				message, ok := <-incoming
				if !ok {
					return
				}

				if printHeaders {
					packet, err := telemetry.ParsePacket(message)
					if err != nil {
						fmt.Println("Unknown packet")
						continue
					}
					fmt.Printf("% 7d@%-20d % 4d:%d\n", packet.ID(), packet.Session(), packet.FormatVersion(), packet.Type())
				}
			}
		}()
	}

	log.Info("Listening for packets", zap.String("address", address))
	if printHeaders {
		fmt.Printf("% 7s@%-20s % 4s:%s\n", "id", "session", "game", "type")
	}

	buffer := make([]byte, 4096)
	for {
		n, peer, err := socket.ReadFrom(buffer)
		if err != nil {
			log.Error("Failed to read from socket", zap.Error(err), zap.String("peer", peer.String()))
			break
		}

		messageSize := uint32(n)
		if err := binary.Write(output, binary.LittleEndian, &messageSize); err != nil {
			log.Error("Failed to write to output", zap.Error(err))
		}

		if _, err := output.Write(buffer[:n]); err != nil {
			log.Error("Failed to write to output", zap.Error(err))
		}

		if collectIncoming {
			message := make([]byte, n)
			copy(message, buffer[:n])
			incoming <- message
		}
	}

	return nil
}
