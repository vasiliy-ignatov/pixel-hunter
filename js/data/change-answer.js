export const changeAnswer = (game, answer) => {
  if (typeof answer !== `object`) {
    throw new Error(`answer should be of type object`);
  }
  const newGame = Object.assign({}, game);
  newGame.answers.push(answer);

  return newGame;
};
