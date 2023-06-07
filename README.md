## Test Task

## Requirements
> **Note:** Before running this application, make sure you have the following prerequisites installed on your machine:

- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)


## Getting Started
Before start docker-compose

Run this command for create network in Docker
```bash 
docker network create my-network
```
## Run commands docker-compose where located in directories docker-compose.yml
## Build 
```bash 
docker-compose build --no-cache
```

## Start
```bash 
docker-compose up -d
```

## Down
```bash
docker-compose down
```
## kafka-container
Run after 
```bash 
docker network create my-network
```

## stock-data-collector-service
Run after kafka-container

## stock-data-processing-service 
Run after stock-data-collector-service

## stock-data-mart-service
Run after stock-data-processing-service



## Stay in touch

- Author - [Grigor Avetisyan](https://www.linkedin.com/in/grigor-avetisyan-342566139/)
- Github - [https://github.com/Grigor1994](https://github.com/Grigor1994)

