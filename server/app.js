require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const initDataBase = require("./startUp/initDataBase");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// /api
app.use("/api", routes);
const PORT = config.get("port") ?? 8080;
const MongoDB = process.env.DB_MONGO;

// if (process.env.NODE_ENV === "production") {
// console.log("Production");
// } else {
//     console.log("Development");
// }

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDataBase();
    });
    await mongoose.connect(MongoDB);
    console.log(chalk.green("MongoDB подключен!"));
    app.listen(PORT, () => {
      console.log(
        chalk.greenBright(`Сервер запущен host: http://localhost:${PORT}/`)
      );
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
