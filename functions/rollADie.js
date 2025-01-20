exports.rollADie = (die) => {
  die = die.split(",");
  return die[Math.floor(Math.random() * die.length)];
};
