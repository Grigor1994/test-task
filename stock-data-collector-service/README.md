# Stock Data Collector Service
> **Description:** Collects stock market data from a public API Alpha Vantage
>
> Stores the collected data in a Kafka topic.

This project is a Docker Compose application.

## Requirements

> **Note:** Before running this application, make sure you have the following prerequisites installed on your machine:

- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)


## Getting Started

Follow these steps to get the project up and running on your local machine:

Update the environment variables:

Create a .env file in the project root directory.
Open the .env file and provide the necessary configuration values. Refer to the example .env.example file for the required variables.


Start the Docker containers
```bash
docker-compose up -d
```
