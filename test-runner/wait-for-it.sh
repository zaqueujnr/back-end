#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available

set -e

HOST="$1"
PORT="$2"
shift 2
CMD="$@"

echo "Aguardando $HOST:$PORT ficar disponível..."

while ! (echo > /dev/tcp/$HOST/$PORT) >/dev/null 2>&1; do
  echo "Ainda esperando $HOST:$PORT..."
  sleep 1
done

echo "$HOST:$PORT está disponível, executando comando..."
exec $CMD