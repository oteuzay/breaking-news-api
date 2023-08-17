const app = require("./app");
const mongoose = require("mongoose");

const config = require("./config/api.config");

const logger = require("./utils/logger");

mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(config.PORT, () => {
      logger.info(`Server is running on port ${config.PORT}.`);
    });
  })
  .catch((error) => {
    logger.error("MongoDB connection error:", error);
  });
