package main

import (
	"encoding/binary"
	"io"
	"math/rand"
	"net"
	"os"
	"time"

	"github.com/AlexGustafsson/f1-telemetry/internal/util"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

type Message struct {
	Length uint32
	Offset int64
}

func ActionSend(ctx *cli.Context) error {
	log, err := util.GetLogger(ctx)
	if err != nil {
		return err
	}

	address := ctx.String("address")
	if address == "" {
		address = "0.0.0.0:20777"
	}

	interval := ctx.Duration("interval")
	if interval == 0 {
		interval = 200 * time.Millisecond
	}

	inputPath := ctx.String("input")
	data, err := os.Open(inputPath)
	if err != nil {
		log.Fatal("Failed to open input", zap.Error(err))
	}
	defer data.Close()

	messages := make([]Message, 0)
	for {
		var length uint32
		if err := binary.Read(data, binary.LittleEndian, &length); err != nil {
			if err == io.EOF {
				break
			}
			log.Error("Failed to read message from input", zap.Error(err))
			break
		}

		offset, err := data.Seek(int64(length), 1)
		if err != nil {
			log.Error("Failed to read message from input", zap.Error(err))
			break
		}

		messages = append(messages, Message{Length: length, Offset: offset - int64(length)})
	}

	log.Info("Loaded messages", zap.Int("count", len(messages)))

	socket, err := net.Dial("udp", address)
	if err != nil {
		log.Fatal("Failed to open UDP socket to server", zap.Error(err))
	}

	buffer := make([]byte, 4096)
	for {
		message := messages[rand.Intn(len(messages))]
		if _, err := data.Seek(message.Offset, 0); err != nil {
			log.Error("Failed to read from input", zap.Error(err))
			continue
		}

		if _, err := data.Read(buffer); err != nil {
			log.Error("Failed to read from input", zap.Error(err))
			continue
		}

		payload := buffer[:message.Length]
		socket.Write(payload)

		log.Debug("Sent message", zap.Uint32("size", message.Length))
		time.Sleep(interval)
	}
}
