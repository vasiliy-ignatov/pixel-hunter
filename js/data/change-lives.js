export const changeLives = (game, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }

  const newGame = Object.assign({}, game, {
    lives
  });
  return newGame;
};
