exports.processInitInput = (initInput) => {
  if (initInput.length < 5) {
    console.error(
      "You haven't specified enough dice. Please specify at least 3 dice."
    );
    process.exit();
  }

  // dice verification
  let dice = initInput.slice(2).map((arg, index) => {
    let die = { die: arg.split(","), initialIndex: index };

    if (die.die.length !== 6) {
      console.log(`Error at:
                Dice: ${die.die}
                `);
      console.error(
        "One of your dice has the number of faces other than 6. Please specify 6 faces (values) for each of your dice."
      );
      process.exit();
    }

    for (let i = 0; i < die.die.length; i++) {
      if (isNaN(die.die[i])) {
        console.log(`Error at:
                        Dice: ${die.die}
                        Face: ${die.die[i]}
                        Index: ${i}
                        `);
        console.error(
          "One of your dice has a value other than a number on one of its faces. Please specify 6 integers for each of your dice."
        );
        process.exit();
      } else if (die.die[i] < 0) {
        console.log(`Error at:
      Dice: ${die.die}
      Face: ${die.die[i]}
      Index: ${i}
      `);
        console.error(
          "One of your dice has a negative value on one of its faces. Please specify 6 positive integers for each of your dice."
        );
        process.exit();
      } else if (!Number.isInteger(Number(die.die[i]))) {
        console.log(`Error at:
            Dice: ${die.die}
            Face: ${die.die[i]}
            Index: ${i}
            `);
        console.error(
          "One of your dice has a non-integer value on one of its faces. Please specify 6 integers for each of your dice."
        );
        process.exit();
      }
    }
    return die;
  });

  return dice;
};

{
  /*
  ## What does it do?
  - Verifies the initial input passed with the command in the command line
  - If the verification has been succesful, it returns an array of objects representing dice and the program continues its course.
  - If not, an error message is displayed and the program exits.
  ,
  ## How is it used?
  - **Where?** The very beginning
  - **Returns?** An array of object: each object contains an array with a particular die's values (faces) and the initial index of each array to further filter this array after one of the players has picked one die (we can't let the other pick the same).
  */
}
