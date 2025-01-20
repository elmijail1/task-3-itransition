exports.determineWinner = (firstRoller, firstRollResult, secondRollResult) => {
  let playerResult;
  let progResult;

  if (firstRoller === "player") {
    playerResult = firstRollResult;
    progResult = secondRollResult;
  } else {
    playerResult = secondRollResult;
    progResult = firstRollResult;
  }

  if (playerResult > progResult) {
    console.log(`You win (${playerResult} > ${progResult})`);
  } else if (playerResult < progResult) {
    console.log(`I win (${progResult} > ${playerResult})`);
  } else {
    console.log(`No one wins: (${playerResult} = ${progResult})`);
  }

  return;
};
