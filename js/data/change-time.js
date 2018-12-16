export const changeTime = (game) => {
  if (typeof game.time !== `number`) {
    throw new Error(`Time should be of type number`);
  }
  const newGame = Object.assign({}, game, {
    time: game.time + 1
  });
  return newGame;
};
