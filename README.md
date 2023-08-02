# Stock Benford Law Project

This project is a TypeScript-based REST API for calculating Benford's Law comparison of stock volume data. The API fetches historical stock data using Yahoo Finance API and calculates the comparison of the leading digits of stock volumes with Benford's Law percentages.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Documentation](#documentation)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm start
```

The server will start on port 4000 by default. You can change the port by setting the `PORT` environment variable.

## Endpoints

- `/stocks/:stockName` - Get Benford's Law comparison for the given stock symbol (`:stockName`).

## Documentation

The API is documented using Swagger. You can access the API documentation at [http://localhost:4000/api-docs](http://localhost:4000/api-docs) after starting the server.

## Environment Variables

Before running the server, ensure you have set up the necessary environment variables in a `.env` file at the root of the project. You can create a `.env` file based on the provided `local.env` file and modify the values as needed.

The required environment variables are:

- `PORT`: The port number on which the server will listen (default: 4000).
- `RAPIDAPI_KEY`: Your RapidAPI key for accessing the Yahoo Finance API.

**Example `.env` file:**

```
PORT=4000
RAPIDAPI_KEY=your_rapidapi_key_here
```

## Docker

To run the application using Docker, build the Docker image using the following command:

```bash
docker build -t stock-benford-law .
```

Then, run the Docker container:

```bash
docker run -p 4000:4000 stock-benford-law
```

The server will be accessible at [http://localhost:4000](http://localhost:4000).