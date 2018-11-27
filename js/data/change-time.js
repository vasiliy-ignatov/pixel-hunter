export const changeTime = (game, time) => {
  if (typeof time !== `number`) {
    throw new Error(`Time should be of type number`);
  }

  if (time < 0) {
    throw new Error(`Time should not be negative value`);
  }
  const newGame = Object.assign({}, game, {
    time
  });
  return newGame;
};
