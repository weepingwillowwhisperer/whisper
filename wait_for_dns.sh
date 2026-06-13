#!/bin/bash
while true; do
  if dig +short willowpdf.com A | grep -q "76.76.21.21"; then
    osascript -e 'display notification "Your domain willowpdf.com is now live and pointing to Vercel!" with title "Domain Ready" sound name "Glass"'
    break
  fi
  sleep 60
done
