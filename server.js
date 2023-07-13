const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  });
