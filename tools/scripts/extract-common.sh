#!/usr/bin/env sh

start="$1"
stop="$2"
interval="$3"
samples="$4"

./cli query -i database --query 'gear{self="true",session="7888152861032096424"}' --from "$start" --to "$stop" --interval "$interval" --samples "$samples" > gear.json
./cli query -i database --query 'steer{self="true",session="7888152861032096424"}' --from "$start" --to "$stop" --interval "$interval" --samples "$samples" > steer.json
./cli query -i database --query 'drs{self="true",session="7888152861032096424"}' --from "$start" --to "$stop" --interval "$interval" --samples "$samples" > drs.json
./cli query -i database --query 'throttle{self="true",session="7888152861032096424"}' --from "$start" --to "$stop" --interval "$interval" --samples "$samples" > throttle.json
./cli query -i database --query 'speed{self="true",session="7888152861032096424"}' --from "$start" --to "$stop" --interval "$interval" --samples "$samples" > speed.json
./cli query -i database --query 'brake{self="true",session="7888152861032096424"}' --from "$start" --to "$stop" --interval "$interval" --samples "$samples" > brake.json
