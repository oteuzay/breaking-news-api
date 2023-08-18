const app = require("./app");
const mongoose = require("mongoose");

const apiConfig = require("./config/api.config");

const logger = require("./utils/logger.util");

mongoose
  .connect(apiConfig.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(apiConfig.PORT, () => {
      logger.info(`Server is running on port ${apiConfig.PORT}.`);
    });
  })
  .catch((error) => {
    logger.error("MongoDB connection error:", error);
  });
