exports.chooseADie = (
  inputReader,
  dice,
  populateOptions2,
  populateIndicesOptions2
) => {
  return new Promise((resolve, reject) => {
    inputReader.question(
      `Now you choose your die:
${populateOptions2(dice)}
x – exit
? – help
`,
      (answer) => {
        const indicesOptions2 = populateIndicesOptions2(dice);
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
};
