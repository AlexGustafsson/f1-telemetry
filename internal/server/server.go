package server

import (
	"log"
	"net"
)

type Message struct {
	Data []byte
	Peer net.Addr
}

type Server struct {
	socket   net.PacketConn
	messages chan Message
}

func Listen(address string) (*Server, error) {
	socket, err := net.ListenPacket("udp", address)
	if err != nil {
		return nil, err
	}

	server := &Server{
		socket:   socket,
		messages: make(chan Message),
	}

	go server.handle()

	return server, nil
}

func (s *Server) Messages() chan Message {
	return s.messages
}

func (s *Server) Close() error {
	return s.socket.Close()
}

func (s *Server) handle() {
	buffer := make([]byte, 2048)
	for {
		n, peer, err := s.socket.ReadFrom(buffer)
		if err != nil {
			log.Println(err)
			continue
		}

		data := make([]byte, n)
		copy(data, buffer[:n])

		s.messages <- Message{data, peer}
	}
}
