exports.removeChosenDie = (dice, die) => {
  dice = dice.filter((d) => d.initialIndex !== die.initialIndex);
  return dice;
};
