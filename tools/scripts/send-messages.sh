#!/usr/bin/env bash

# This scripts sends messages from a corpus of messages extracted using the
# extract-messages.sh script.

if [[ ! -f "$1" ]] || [[ -z "$2" ]] || [[ -z "$3" ]]; then
  echo "usage: $0 <corpus.txt> <address> <port>"
  exit 1
fi

length="$(wc -l "$1" | cut -d' ' -f1)"

while true; do
  index=$(( ( RANDOM % length )  + 1 ))
  head -n "$index" "$1" | tail -n 1 | xxd -p -r > "/dev/udp/$2/$3"
  sleep 0.2
done
