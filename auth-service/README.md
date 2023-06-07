## AUTH SERVICE API

> **Description:**  Implements a secure authentication system for the clients accessing the APIs.
>
>Generates and provides JWT tokens to authenticated clients.


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


## Register new user


### URL

    /api/user/register

### Method:

    POST

### Body

Required: email, password

### Request body

```JSON
{
  "email": "<example@gmail.com>",
  "password": "<password>"
}
```

### Response body

```JSON
{
  "accessToken": "<jwt-token>"
}
```

## User login

### URL

    /api/auth/login

### Method:

    POST

### Body

Required: email, password

### Request body

```JSON
{
  "email": "<example@gmail.com>",
  "password": "<password>"
}
```

### Response body

```JSON
{
  "accessToken": "<jwt-token>"
}
```

## Verify JWT token

### URL

    /api/auth/verify

### Method:

    POST

### Request body

```JSON
{
  "token": "<jwt-token>"
}
```

### Response body

```JSON
{
  "isValidToken": true
}
```

## Stay in touch

- Author - [Grigor Avetisyan](https://www.linkedin.com/in/grigor-avetisyan-342566139/)
- Github - [https://github.com/Grigor1994](https://github.com/Grigor1994)

