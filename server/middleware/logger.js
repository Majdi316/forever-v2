//TODO Libraries
import morgan from "morgan";
import chalk from "chalk";
import crypto from "crypto";
import fs from "fs";
//TODO Import Function
import { currentTime } from "../utils/timeService.js";

//TODO Functions
const date = Date.now();
const writeInLog = async (path, result) => {
  try {
    await fs.appendFile(path, result, "utf8", (err) => {
      if (err) throw err;
      console.log("The data was appended to the file!");
    });
  } catch (error) {
    console.log(error);
  }
};
export default morgan(function (tokens, req, res) {
  const { year, month, day, hours, minutes, seconds } = currentTime();
  const currentDate = `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`;
  const logDate = `${year}-${month}-${day}`;
  const id = crypto.randomBytes(16).toString("hex");
  const result = [
    "\n",
    "***************************************",
    "\n",
    "ID :",
    "\t",
    id,
    "\n",
    "Time : ",
    "\t",
    currentDate,
    "\n",
    "Method : ",
    "\t",
    tokens.method(req, res),
    "\n",
    "Path : ",
    "\t",
    tokens.url(req, res),
    "\n",
    "Status : ",
    "\t",
    tokens.status(req, res),
    "\n",
    "Delay : ",
    "\t",
    tokens["response-time"](req, res),
    "ms",
    "\n",
    "Status Message : ",
    "\t",
    res.statusMessage,
    "\n",
    "User Agent : ",
    "\t",
    tokens["user-agent"](req, res),
    
  ].join(" ");
  if (tokens.status(req, res) >= 400) {
    let path = `./logs/${logDate}.txt`;
    writeInLog(path, result);
    return chalk.redBright(result);
  } else {
    return chalk.greenBright(result);
  }
});
