// General
const { inputReader } = require("./utilities/inputReader.js");
// For question 1
const determineWhoRollsFirst = require("./functions/determineWhoRollsFirst.js");
// For question 2
const { chooseADie } = require("./functions/chooseADie.js");

if (process.argv.length < 5) {
  console.error(
    "You haven't specified enough dice. Please specify at least 3 dice."
  );
  return;
}
let dice = process.argv.slice(2).map((arg, index) => {
  return { die: arg, initialIndex: index };
});

// prog chooses a random die and it's removed from the dice
function chooseARandomDie() {
  const randomDie = dice[Math.floor(Math.random() * dice.length)];
  dice = dice.filter((die) => die.initialIndex !== randomDie.initialIndex);
  return randomDie;
}

// M A I N  F U N C T I O N
async function main() {
  const randomNumberFrom0To1 = Math.round(Math.random());
  // initial HMAC calcualtion

  // * * *
  // QUESTION 1
  try {
    var response1 = await determineWhoRollsFirst(inputReader);
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

  let dieProgs = chooseARandomDie().die;
  console.log(`I chose this die: ${dieProgs}.
  `);

  // * *
  // * * *
  // QUESTION 2 SECTION
  try {
    var diePlayers = await chooseADie(inputReader, dice); // the die you've chosen
    console.log(`You chose this die: ${diePlayers.die}`); // display the chosen die
    dice = dice.filter((die) => die.initialIndex !== diePlayers.initialIndex); // remove the die you've chosen from the dice array
  } catch (error) {
    console.error(error);
    process.exit();
  }

  // * *
  // * * *
  // QUESTION 3 SECTION
  // dieProgs is rolled

  // * *
  // * * *
  // QUESTION 4 SECTION
  // diePlayers is rolled

  // * *
  // * * *
  // VICTORY SECTION
  // resultProgs & resultPlayers are compated and the winner is determined

  // GET BACK TO:
  // 1. BASIC LOGIC
  // 1.1. firstRoller must determine who chooses first
  // 1.2. firstRoller must determine who rolls first (i.e. Q3 & Q4 can change places)
  // 1.3. Make the Exit option work in all CLI menus
  // 1.4. Make the Help option work in all CLI menus (no table yet, a PH would do)
  // 2. ADD CRAZY STUFF
  // 2.1. HMACs & keys (use APIs)
  // 2.2. The help table (use APIs)
  // 2.3. If there's still some time left, see if you can add OOP to it all somehow

  inputReader.close();
}

main();
