const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");

const PORT = config.get("port") ?? 8080;
const app = express();

// if (process.env.NODE_ENV === "production") {
// console.log("Production");
// } else {
//     console.log("Development");
// }

app.listen(PORT, () => {
  console.log(chalk.green(`Сервер запущен на порте: ${PORT}`));
});