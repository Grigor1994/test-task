# Stock Data Mart Service
> **Description:** Stores the processed stock market data in a PostgreSQL database.
>
> Provides an endpoint to retrieve the stored data with support for paging


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

## Get stock data moving average


### GET /api/stock-data

**Required Header**
- Authorization

Which calculates the simple moving average for the given period(In our case period is equal 10 days)
**Parameters:**

- `page` (non required)
- `limit` (non required)

> **Example:** GET /api/resource?page=1
>
>
> **Example:** GET /api/resource?page=1&limit=10
