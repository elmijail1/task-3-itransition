const AsciiTable = require("ascii-table/ascii-table");
var table = new AsciiTable("Winning probabilities");

exports.createTable = (dice) => {
  function extractDiceProper() {
    const diceProper = [];
    for (let i = 0; i < dice.length; i++) {
      diceProper.push(dice[i].die);
    }
    return diceProper;
  }

  dice = extractDiceProper();

  function countProbabilities(values1, values2) {
    let wins = 0;
    for (let i = 0; i < values1.length; i++) {
      for (let ii = 0; ii < values2.length; ii++) {
        if (values1[i] > values2[ii]) {
          wins++;
        }
      }
    }
    return Number.parseFloat(wins / 36).toFixed(4);
  }

  function populateRows() {
    const rows = [];
    for (let i = 0; i < dice.length; i++) {
      const probs = [dice[i]];
      for (let ii = 0; ii < dice.length; ii++) {
        if (i === ii) {
          probs.push("—");
        } else {
          probs.push(countProbabilities(dice[i], dice[ii]));
        }
      }
      rows.push(probs);
    }
    return rows;
  }

  table.setHeading("User dice ↓", ...dice).addRowMatrix(populateRows());

  return table.toString();
};
