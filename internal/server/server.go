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
	messages chan Message
	close    chan struct{}
}

func New() *Server {
	return &Server{
		messages: make(chan Message, 128),
		close:    make(chan struct{}),
	}
}

func (s *Server) ListenAndServe(address string) error {
	socket, err := net.ListenPacket("udp", address)
	if err != nil {
		return err
	}

	buffer := make([]byte, 2048)
	for {
		select {
		case <-s.close:
			return nil
		default:
			n, peer, err := socket.ReadFrom(buffer)
			if err != nil {
				log.Println(err)
				continue
			}

			data := make([]byte, n)
			copy(data, buffer[:n])

			s.messages <- Message{data, peer}
		}
	}
}

func (s *Server) Messages() chan Message {
	return s.messages
}

func (s *Server) Close() {
	close(s.close)
}
