#!/bin/bash

# ----------------------------------------------------------------

waitForConntaction() {
  port="$1"
  sleep 3
  while true; do
    echo "try to link... http://127.0.0.1:$port"
    if curl -sSf "http://127.0.0.1:$port" >/dev/null 2>&1; then
      echo "Connection successful."
      break
    else
      #echo "Connection failed. Retrying in 5 seconds..."
      sleep 5
    fi
  done
}

# ----------------------------------------------------------------

rm -f "${LOCAL_VOLUMN_PATH}/.docker-web.ready" || true
rm -f "${LOCAL_VOLUMN_PATH}/.cloudflare.url" || true
ls -la "${LOCAL_VOLUMN_PATH}/"

# ----------------------------------------------------------------

echo "${WAIT_FOR_SERVICE}"
eval "${WAIT_FOR_SERVICE}"

# ----------------------------------------------------------------

# /usr/local/bin/node /app/server.js &
eval "${STARTUP_COMMAND}" &

#echo "BEFORE ================================================================="
waitForConntaction "${LOCAL_PORT}"
#echo "AFTER ================================================================="

# ----------------------------------------------------------------

setupCloudflare() {
  file="/tmp/cloudflared"
  if [ ! -f "$file" ]; then
    wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -O "${file}"
    chmod a+x "${file}"
  fi
}

runCloudflare() {
  port="$1"
  file_path="$2"

  #echo "p ${port} ${file_path}"

  rm -rf "${file_path}"
  #nohup /tmp/.cloudflared --url "http://127.0.0.1:${port}" > "${file_path}" 2>&1 &
  /tmp/cloudflared --url "http://127.0.0.1:${port}" > "${file_path}" 2>&1 &
}

getCloudflarePublicURL() {
  setupCloudflare

  port="$1"

    # File path
  file_path="/tmp/cloudflared.out"

  runCloudflare "${port}" "${file_path}" &

  sleep 3

  # Extracting the URL using grep and awk
  url=$(grep -o 'https://[^ ]*\.trycloudflare\.com' "$file_path" | awk '/https:\/\/[^ ]*\.trycloudflare\.com/{print; exit}')

  echo "$url${HOMEPAGE_URI}"
}

getCloudflarePublicURL "${LOCAL_PORT}" > "${LOCAL_VOLUMN_PATH}/.cloudflare.url"

# ----------------------------------------------------------------

url="http://127.0.0.1:${LOCAL_PORT}${HOMEPAGE_URI}"


while true; do
    response=$(curl -L -s "$url")
    #echo "$response"
    if [[ $(echo "$response" | jq -e . 2>/dev/null) ]]; then
        echo "Received JSON, sleeping for 5 seconds..."
        sleep 5
    elif [[ $response =~ "<html" || $response =~ "<!DOCTYPE" || $response =~ "Hello, world!" ]]; then
        sleep 10
        echo "Received HTML, it's okay!"
        break
    else
        echo "Unexpected response. Exiting."
        #exit 1
        sleep 5
    fi
done

echo `date` > "${LOCAL_VOLUMN_PATH}/.docker-web.ready"

echo "================================================================"
echo "Docker Web is ready to serve."
echo `cat "${LOCAL_VOLUMN_PATH}/.cloudflare.url"`
echo "================================================================"

# ----------------------------------------------------------------

while true; do
  sleep 10
done