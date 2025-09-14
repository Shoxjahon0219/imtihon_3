const express = require("express");
const config = require("config");
const sequelize = require("./config/db");

const MainRouter = require("./routes/index.js");
const errorHadling = require("./middlewares/errors/error.hadling");

const app = express();

const PORT = config.get("port") ?? 3333;

app.use(express.json());
app.use("/api", MainRouter);

app.use(errorHadling);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
