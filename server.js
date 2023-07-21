const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const logger = require("./utils/logger");

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}.`);
    });
  })
  .catch((error) => {
    logger.error("MongoDB connection error:", error);
  });
