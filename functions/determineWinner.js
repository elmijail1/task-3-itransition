exports.determineWinner = (
  firstRollerName,
  firstRollResult,
  secondRollResult
) => {
  let playerResult;
  let progResult;

  if (firstRollerName === "player") {
    playerResult = firstRollResult;
    progResult = secondRollResult;
  } else if (firstRollerName === "program") {
    playerResult = secondRollResult;
    progResult = firstRollResult;
  }

  if (playerResult > progResult) {
    console.log(`You win (${playerResult} > ${progResult})`);
  } else if (playerResult < progResult) {
    console.log(`I win (${progResult} > ${playerResult})`);
  } else if (playerResult === progResult) {
    console.log(`No one wins: (${playerResult} = ${progResult})`);
  }

  return;
};

{
  /*
    ## What does it do?
  - Compares the results of the player and the program
  - Determines how the game's ended based on that
  - Console.log's the message declaring that
  ,
    ## How is it used?
    - **Where?** Final Results Section
    - **Returns?** Nothing.
    */
}
