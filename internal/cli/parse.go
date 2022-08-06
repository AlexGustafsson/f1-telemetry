package cli

import (
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/AlexGustafsson/f1-telemetry/internal/util"
	"github.com/AlexGustafsson/f1-telemetry/telemetry"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

func ActionParse(ctx *cli.Context) error {
	log, err := util.GetLogger(ctx)
	if err != nil {
		return err
	}

	inputPath := ctx.String("input")
	data, err := os.Open(inputPath)
	if err != nil {
		log.Fatal("Failed to open input", zap.Error(err))
	}
	defer data.Close()

	encoder := json.NewEncoder(os.Stdout)
	encoder.SetIndent("", "  ")

	var buffer [4096]byte
	offset := 0
	for {
		var length uint32
		if err := binary.Read(data, binary.LittleEndian, &length); err != nil {
			if err == io.EOF {
				break
			}
			log.Error("Failed to read message from input", zap.Error(err))
			break
		}

		read, err := data.Read(buffer[0:length])
		if err != nil {
			log.Error("Failed to read message from input", zap.Error(err))
			break
		}

		packet, err := telemetry.ParsePacket(buffer[:read])
		if err != nil {
			log.Error("Failed to parse packet", zap.Error(err))
			continue
		}

		fmt.Println("-----")
		fmt.Println("Offset", offset+4) // Exclude the message size uint32
		fmt.Println("Length", length)
		encoder.Encode(packet)

		offset += 4 + read
	}

	return nil
}
