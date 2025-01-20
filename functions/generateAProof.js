exports.generateAProof = (inputReader, whoRolls) => {
  let rollerPronoun;
  if (whoRolls === "player") {
    rollerPronoun = "you";
  } else {
    rollerPronoun = "me";
  }

  return new Promise((resolve, reject) => {
    inputReader.question(
      `It's time for ${rollerPronoun} to roll.
  I selected a random value in the range from 0 to 5.
  (HMAC = ...)
  Add your number modulo 6:
  – Enter "0" for 0
  - Enter "1" for 1
  - Enter "2" for 2
  - Enter "3" for 3
  - Enter "4" for 4
  - Enter "5" for 5
    - - -
  - Enter "x" to exit
  - Enter "?" for help
  `,
      (answer) => {
        if (["0", "1", "2", "3", "4", "5", "x", "?"].includes(answer)) {
          if (["0", "1", "2", "3", "4", "5"].includes(answer)) {
            resolve(answer);
          } else if (answer === "?") {
            console.log("Help is on the way!");
          } else if (answer === "x") {
            process.exit();
          }
        } else {
          reject(
            "You've entered a non-existant option. Try again: choose among 0, 1, 2, 3, 4, 5, x, and ?."
          );
        }
      }
    );
  });
};

{
  /*
    ## What does it do?
  - Determines the current roller's pronoun (for the template literal)
  - Instructs the player to choose a number to generate a key
  - Verifies the response
  - (If successful) Returns the player's response for further calculation
  - (Alternatively) Responds otherwise
    ,
    ## How is it used?
    - **Where?** Sections 3-4
    - **Returns?** A number within the range from 0 to 5.
    */
}
