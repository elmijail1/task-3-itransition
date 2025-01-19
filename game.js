const determineWhoRollsFirst = require("./functions/determineWhoRollsFirst.js");

if (process.argv.length < 5) {
  console.error(
    "You haven't specified enough dice. Please specify at least 3 dice."
  );
  return;
}
let dice = process.argv.slice(2).map((arg, index) => {
  return { die: arg, initialIndex: index };
});

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// prog chooses a random die and it's removed from the dice
function chooseARandomDie() {
  const randomDie = dice[Math.floor(Math.random() * dice.length)];
  dice = dice.filter((die) => die.initialIndex !== randomDie.initialIndex);
  return randomDie;
}

// we're going to need that for verificaiton later
const indicesOptions2 = [];

// map options for question 2 (there can be more than 3 dice total)
function populateOptions2() {
  const lines = [];
  for (let i = 0; i < dice.length; i++) {
    lines.push(`${i} – ${dice[i].die}`);
    indicesOptions2.push(String(i));
  }
  return lines
    .map((line, index) => {
      if (index === lines.length - 1) {
        return line;
      } else {
        return line + "\n";
      }
    })
    .join(""); // join is used to remove unncecessary auto commas here
}

// question 2
function choooseADie() {
  return new Promise((resolve, reject) => {
    rl.question(
      `I choose this die: ${chooseARandomDie()}.
Choose yours:
${populateOptions2()}
x – exit
? – help
`,
      (answer) => {
        if ([...indicesOptions2, "x", "?"].includes(answer)) {
          if ([...indicesOptions2].includes(answer)) {
            resolve(dice[Number(answer)]);
          } else if (answer === "x") {
            process.exit();
          } else if (answer === "?") {
            console.log("Help is on the way!");
          }
        } else {
          reject(
            `You've entered a non-existant option. Try again: choose among ${indicesOptions2.join(
              ", "
            )}, x, and ?.`
          );
        }
      }
    );
  });
}

// M A I N  F U N C T I O N
async function main() {
  const randomNumberFrom0To1 = Math.round(Math.random());
  // initial HMAC calcualtion

  // question 1
  try {
    var response1 = await determineWhoRollsFirst(rl);
  } catch (error) {
    console.error(error);
    process.exit();
  }

  // key calculation

  //   who's first to roll calculation
  let firstRoller;
  console.log(response1, randomNumberFrom0To1);

  function firstToRoll() {
    if (Number(response1) === randomNumberFrom0To1) {
      firstRoller = "player";
      return "you";
    } else {
      firstRoller = "program";
      return "me";
    }
  }

  console.log(`
Your selection: ${response1}
My selection: ${randomNumberFrom0To1}
(KEY = ...)

Hence, first to roll is ${firstToRoll()}!
`);

  // QUESTION 2 SECTION
  try {
    var response2 = await choooseADie(); // the die you've chosen
    console.log(`You chose this die: ${response2.die}`); // display the chosen die
    dice = dice.filter((die) => die.initialIndex !== response2.initialIndex); // remove the die you've chosen from the dice array
  } catch (error) {
    console.error(error);
    process.exit();
  }

  rl.close();
}

main();
