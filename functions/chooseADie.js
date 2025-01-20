const {
  populateOptions2,
  populateIndicesOptions2,
} = require("./populateOptions2");

exports.chooseADie = (inputReader, dice, probTable) => {
  return new Promise((resolve, reject) => {
    inputReader.question(
      `Now you choose your die:
${populateOptions2(dice)}
x – Enter "x" to exit
? – Enter "?" for help
`,
      (answer) => {
        const indicesOptions2 = populateIndicesOptions2(dice);
        if ([...indicesOptions2, "x", "?"].includes(answer)) {
          if ([...indicesOptions2].includes(answer)) {
            resolve(dice[Number(answer)]);
          } else if (answer === "x") {
            process.exit();
          } else if (answer === "?") {
            inputReader.question(
              `${probTable}
Choose your die:
${populateOptions2(dice)}
x - Enter "x" to exit
`,
              (answer) => {
                const indicesOptions2 = populateIndicesOptions2(dice);
                if ([...indicesOptions2, "x", "?"].includes(answer)) {
                  if ([...indicesOptions2].includes(answer)) {
                    resolve(dice[Number(answer)]);
                  } else if (answer === "x") {
                    process.exit();
                  }
                } else {
                  reject(
                    "You've entered a non-existant option. Next time choose among 0, 1, x, and ?."
                  );
                }
              }
            );
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
};

{
  /*
## What does it do?
- Informs the user that it's necessary to choose a die
- Shows available options
- Registers the user's response
- (if successful) Returns the die of the user's choice and saves it in the broader function
- (alternatively) Responds respectively
,
## How is it used?
- **Where?** Section 2
- **Returns?** An object: it contains the die and its initial index.
*/
}
