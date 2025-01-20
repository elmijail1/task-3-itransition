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
