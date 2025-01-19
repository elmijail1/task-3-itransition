module.exports = function determineWhoRollsFirst(rl) {
  return new Promise((resolve, reject) => {
    rl.question(
      `Let's determine who rolls first.
  I selected a random value in the range from 0 to 1.
  (HMAC = ...)
  Guess my number:
  – Enter "0" for 0
  - Enter "1" for 1
  - Enter "x" to exit
  - Enter "?" for help
`,
      (answer) => {
        if (["0", "1", "x", "?"].includes(answer)) {
          resolve(answer);
        } else {
          reject(
            "You've entered a non-existant option. Try again: choose among 0, 1, x, and ?."
          );
        }
      }
    );
  });
};

{
  /*
## What does it do?
- Informs the user that it's necessary to determine who rolls first
- Informs the user that the prog has chosen a number which is either 0 or 1
- Prompts the user to guess which one it is
- Accepts the value of 0 or 1
- Alternatively exits the prog or shows help
,
## How is it used?
- **Where?** Question 1
- **Returns?** A number: either 0 or 1. It's then compared to the one generated by the prog. If the numbers are equal, the player rolls first. If not, it's the opposite.
*/
}
