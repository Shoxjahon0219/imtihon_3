const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");

const MainRouter = require("./routes/index.js");
const errorHandling = require("./middlewares/errors/error.hadling");

const app = express();

const PORT = config.get("port") ?? 3333;

app.use(express.json());
app.use(cookieParser());

app.use("/api", MainRouter);

app.use(errorHandling);

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
