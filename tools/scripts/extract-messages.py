#!/usr/bin/env python3

from hashlib import md5
from sys import argv
from os import path

# This script extracts messages from a continous binary file. It's useful for
# testing when you've dumped a large amount of events from a F1 game.


# NOTE: This is brutally slow due to only reading 1 byte at a time, we should
# probably buffer this and extract messages more intelligently
def main(data_path: str, corpus_dir: str):
    with open(data_path, 'rb') as data_file:
        buffer = bytes()
        while True:
            byte = data_file.read(1024)
            buffer += byte

            next_message_start = buffer.index(b"\xe5\x07\x01\x12\x01", 5)
            print(next_message_start)
            if next_message_start != -1:
                message = buffer[:next_message_start]
                buffer = buffer[next_message_start:]
                # message_id = md5(message).hexdigest()
                # with open(path.join(corpus_dir, message_id), "wb") as message_file:
                #     message_file.write(message)


if __name__ == "__main__":
    if len(argv) != 3:
        print(f"usage: {argv[0]} <data.bin> <corpus directory>")
        exit(1)

    main(argv[1], argv[2])
