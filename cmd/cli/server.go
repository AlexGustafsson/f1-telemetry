package main

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"os"

	"github.com/AlexGustafsson/f1-telemetry/internal/server"
	"github.com/AlexGustafsson/f1-telemetry/telemetry"
	"github.com/AlexGustafsson/f1-telemetry/telemetry/f12021"
	"github.com/AlexGustafsson/f1-telemetry/telemetry/f1struct"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

func ActionServer(ctx *cli.Context) error {
	log, err := configureLogging(ctx)
	if err != nil {
		return err
	}

	address := ctx.String("address")
	if address == "" {
		address = "0.0.0.0:20777"
	}

	server, err := server.Listen(address)
	if err != nil {
		log.Fatal("Failed to listen for incoming packets", zap.Error(err))
	}
	defer server.Close()

	encoder := json.NewEncoder(os.Stdout)
	encoder.SetIndent("", "  ")

	for {
		message, ok := <-server.Messages()
		if !ok {
			break
		}

		// TODO: Data scripts don't seem to support messages > 1024B
		if len(message.Data) == 1024 {
			continue
		}

		// Probably fast enough to do on the "message thread"
		packet, err := telemetry.ParsePacket(message.Data)
		if err != nil {
			log.Error("Failed to parse packet", zap.Error(err))
			continue
		}

		marshaled, err := f1struct.Marshal(packet)
		if err != nil {
			log.Error("Failed to marshal packet", zap.Error(err))
			continue
		}

		survivedRoundtrip := hex.EncodeToString(message.Data) == hex.EncodeToString(marshaled)
		if p, ok := packet.(f12021.Packet); ok {
			fmt.Println(p.Header().PacketID, survivedRoundtrip)
			if !survivedRoundtrip {
				fmt.Printf("%d vs %d", len(message.Data), len(marshaled))
				fmt.Println("Message")
				fmt.Println(hex.EncodeToString(message.Data))
				fmt.Println("Marshaled")
				fmt.Println(hex.EncodeToString(marshaled))
			}
		} else {
			log.Error("Unknown packet type")
		}
		// encoder.Encode(packet)
	}

	return nil
}
