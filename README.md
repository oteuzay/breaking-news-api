# Breaking News API [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/oteuzay/breaking-news-api/blob/main/LICENSE)

The Breaking News API is a monolithic API that simplifies the process of delivering up-to-date and critical news to your users effortlessly.

## Tech Stack

```json
{
  "dependencies": {
    /* Web Framework */
    "express": "^4.18.2",
    /* ODM */
    "mongoose": "^7.3.4",
    /* Validator */
    "express-validator": "^7.0.1",
    /* Authentication */
    "jsonwebtoken": "^9.0.1",
    /* Logging */
    "winston": "^3.10.0"
    /* Errors */
    "http-errors": "^2.0.0",
    /* Documentation */
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0",
    /* Security */
    "helmet": "^7.0.0",
    "bcryptjs": "^2.4.3",
    /* Others */
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

## Installation

You can get the project up and running by following the steps below.

```sh
  git clone https://github.com/oteuzay/breaking-news-api.git
```

```sh
  cd breaking-news-api
```

```sh
  cp .env.example .env
```

**Please make sure to customize the environment variables in the .env file.**

```bash
  npm install
```

```bash
  npm run start
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
