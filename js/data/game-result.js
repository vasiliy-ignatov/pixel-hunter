export const getGameResult = (answers, lives) => {
  const ANSWERS_LENGTH = 10;
  if (answers.length !== ANSWERS_LENGTH) {
    return 0;
  } else {
    const TIME_RESULTS = {
      'fast': 10,
      'slow': 20
    };
    const fastAnswersArr = answers.filter((item) => item.time < TIME_RESULTS.fast);
    const slowAnswersArr = answers.filter((item) => item.time > TIME_RESULTS.slow);
    const correctAnswer = answers.filter((item) => item.answer > 0);

    const POINTS = {
      'level': 100,
      'bonus': 50
    };

    const gamePoints = correctAnswer.length * POINTS.level;
    const fastAnswers = fastAnswersArr.length;
    const fastPoints = fastAnswers * POINTS.bonus;
    const slowAnswers = slowAnswersArr.length;
    const slowPoints = slowAnswers * POINTS.bonus * -1;
    const livePoints = lives * POINTS.bonus;
    const allPoints = gamePoints + fastPoints + livePoints + slowPoints;

    const result = {
      'gamePoints': gamePoints,
      'fastAnswers': fastAnswers,
      'fastPoints': fastPoints,
      'slowAnswers': slowAnswers,
      'slowPoints': slowPoints,
      'livePoints': livePoints,
      'allPoints': allPoints
    };
    return result;
  }
};
