exports.populateOptions2 = (dice) => {
  const lines = [];
  for (let i = 0; i < dice.length; i++) {
    lines.push(`${i} – ${dice[i].die}`);
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
};

exports.populateIndicesOptions2 = (dice) => {
  const indicesOptions2 = [];
  for (let i = 0; i < dice.length; i++) {
    indicesOptions2.push(String(i));
  }
  return indicesOptions2;
};

{
  /*
## What do they do?
- 1. populateOptions2:
    - It creates as many lines of options as there are dice in the dice array
    - It uses the dice's indices as the key for the option
    - It adds a newline after each option line
- 2. populateIndicesOptions2:
    - It adds the indices of dice to a separate array and returns the array
  ,
## How are they used?
- 1. populateOptions2:
    - **Where?** Section 2 (Which die do you want to roll?)
    - **Returns?** As many text lines as there are items in the dice array. Those lines go to the 2nd question's prompt.
- 2. populateIndicesOptions2:
    - **Where?** Section 2 (Which die do you want to roll?)
    - **Returns?** An array of indices. It's later used for verification of the user's input.
  */
}
