package cli

import (
	"encoding/binary"
	"net"
	"os"

	"github.com/AlexGustafsson/f1-telemetry/internal/util"
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

	socket, err := net.ListenPacket("udp", address)
	if err != nil {
		log.Fatal("Failed to listen for incoming packets", zap.Error(err))
	}
	defer socket.Close()

	output, err := os.OpenFile(outputPath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0666)
	if err != nil {
		log.Fatal("Failed to open output", zap.Error(err))
	}
	defer output.Close()

	log.Info("Listening for packets", zap.String("address", address))
	buffer := make([]byte, 4096)
	for {
		n, _, err := socket.ReadFrom(buffer)
		if err != nil {
			log.Error("Failed to read from socket", zap.Error(err))
			break
		}

		messageSize := uint32(n)
		if err := binary.Write(output, binary.LittleEndian, &messageSize); err != nil {
			log.Error("Failed to write to output", zap.Error(err))
		}

		if _, err := output.Write(buffer[:n]); err != nil {
			log.Error("Failed to write to output", zap.Error(err))
		}
		output.Sync()
	}

	return nil
}
