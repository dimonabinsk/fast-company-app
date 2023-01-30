const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");

const PORT = config.get("port") ?? 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// if (process.env.NODE_ENV === "production") {
// console.log("Production");
// } else {
//     console.log("Development");
// }

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
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
