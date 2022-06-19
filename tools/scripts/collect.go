package main

// This script listens on UDP 0.0.0.0:20777 and writes all incoming datagrams
// to data.bin. Usefuly for dumping lots of data from a F1 game

import (
	"log"
	"net"
	"os"
)

func main() {
	socket, err := net.ListenPacket("udp", "0.0.0.0:20777")
	if err != nil {
		log.Fatal(err)
	}
	defer socket.Close()

	data, err := os.OpenFile("data.bin", os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		log.Fatal(err)
	}
	defer data.Close()

	buffer := make([]byte, 4096)
	for {
		n, _, err := socket.ReadFrom(buffer)
		if err != nil {
			break
		}

		data.Write(buffer[:n])
	}
}
