const readline = require("readline");

exports.inputReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
