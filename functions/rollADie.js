exports.rollADie = (die) => {
  die = die.split(",");
  return die[Math.floor(Math.random() * die.length)];
};

{
  /*
  ## What does it do?
- Accepts a die as a string and splits it into an array
- Randomly picks one of the values
  ,
  ## How is it used?
  - **Where?** Sections 3-4
  - **Returns?** A number: One of the die faces' value.
  */
}
