# Breaking News API

<img src="/docs/assets/cover.png" style="width: 40%" />

The Breaking News API simplifies the process of delivering up-to-date and critical news to your users effortlessly.

## Installation

Let's get started with the installation process:

1. Clone the project by running the following command:

```sh
git clone https://github.com/oteuzay/breaking-news-api.git
```

2. Navigate to the project folder and create a `.env` file:

```sh
cd breaking-news-api && touch .env
```

3. Open the `.env` file and provide the required parameters:

```sh
PORT=      # Specify the port on which the server will run
DB_URL=    # Provide the URL for your database connection
JWT_SECRET=    # Set a secure secret for JSON Web Token (JWT) encryption
```

4. Once you've filled in the necessary environment variables, you can choose one of the following methods to start the server:

- Using `Docker Compose`:

```sh
docker-compose up
```

- Using `npm`:

```sh
npm install
```

```sh
npm run start
```

### Issues

If you encounter any problems, have questions, or wish to share feedback, please don't hesitate to create an issue in our repository. Your input is valuable, and we will respond promptly to assist you.

### Contributions & Pull Requests

If you have improvements or new features to add, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name for your changes.
3. Make your modifications and commit them with clear and concise messages.
4. Push your changes to your forked repository.
5. Submit a pull request to our main repository, detailing the changes you've made.

### License

This Breaking News API project is licensed under the [MIT License](https://github.com/oteuzay/breaking-news-api/blob/main/LICENSE). Please review the license file for more details.

Thank you for your interest and valuable contributions!
