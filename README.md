# Breaking News API [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/oteuzay/breaking-news-api/blob/main/LICENSE)

The Breaking News API is a monolithic API that simplifies the process of delivering up-to-date and critical news to your users effortlessly.

## Stack

| Category       | Dependency                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web Framework  | [Express Framework](https://expressjs.com/)                                                                                                                                                       |
| ODM            | [Mongoose](https://mongoosejs.com/)                                                                                                                                                               |
| Validator      | [Express Validator](https://express-validator.github.io/docs)                                                                                                                                     |
| Authentication | [JWT](https://www.npmjs.com/package/jsonwebtoken)                                                                                                                                                 |
| Logging        | [Winston](https://github.com/winstonjs/winston)                                                                                                                                                   |
| Documentation  | [Swagger](https://swagger.io/)                                                                                                                                                                    |
| Security       | [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - [Helmet](https://helmetjs.github.io/)                                                                                                       |
| Others         | [Cors](https://www.npmjs.com/package/cors) - [Compression](https://www.npmjs.com/package/compression) - [Dotenv](https://github.com/motdotla/dotenv) - [Nodemon](https://github.com/remy/nodemon) |

## Installation

You can get the project up and running by following the steps below.

```sh
  git clone https://github.com/oteuzay/breaking-news-api.git
```

```sh
  cd breaking-news-api
```

Now, it's time to set up the environment variables.

Create a new file named .env from the .env.example file.

```sh
  cp .env.example .env
```

Please make sure to customize the environment variables in the .env file according to your specific needs.

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
