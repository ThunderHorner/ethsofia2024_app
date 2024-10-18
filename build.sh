docker stop popit-wallet && docker rm popit-wallet

# Build the Docker image
docker build -t popit-wallet .

# Run the container
docker run -d -p 8089:8080 --name popit-wallet popit-wallet
