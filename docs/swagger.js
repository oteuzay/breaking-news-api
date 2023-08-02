const swaggerJSDoc = require("swagger-jsdoc");

/* The `package.json` file typically contains metadata about the project, including
the project name, version, description, dependencies, and other information. In this case, it is
being used to retrieve the name, version, and description of the project to populate the Swagger
documentation. */
const package = require("../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: package.name,
      version: package.version,
      description: package.description,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);
