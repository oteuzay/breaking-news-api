# Breaking News API [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/oteuzay/breaking-news-api/blob/main/LICENSE)

The Breaking News API is a monolithic API that simplifies the process of delivering up-to-date and critical news to your users effortlessly.

## Installation

You can get the project up and running by following the steps below.

#### 1. Clone

Start by cloning this project.

```sh
  git clone https://github.com/oteuzay/breaking-news-api.git
```

```sh
  cd breaking-news-api
```

#### 2. Environment Variables

Now, it's time to set up the environment variables.

Create a new file named .env from the .env.example file.

```sh
  cp .env.example .env
```

Please make sure to customize the environment variables in the .env file according to your specific needs.

#### 3.1 with NPM

For running the application with NPM, run the following commands:

```bash
  npm install
```

```bash
  npm run start
```

#### 3.2 with Docker

If you prefer using Docker to run the project, you can use the following commands:

```bash
  docker build -t breaking-news-api .
```

```bash
  docker-compose up
```

## Documentation

When you set `NODE_ENV` to `Development` in your environment variables, you gain access to the Swagger documentation.

The Swagger documentation can be found at the following endpoint:

`/api-docs`

### Issues

Feel free to create an issue in our repository for any problems, questions, or feedback you have.

### Contributing

We welcome contributions, new features, improvements, and feedback.

Please fork the repository, make your changes, and submit a pull request for consideration.
