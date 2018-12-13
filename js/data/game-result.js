export const getGameResult = (answers, lives) => {
  const ANSWERS_LENGTH = 10;
  if (answers.length !== ANSWERS_LENGTH) {
    return 0;
  } else {
    const TimeResult = {
      FAST: 10,
      SLOW: 20
    };
    const fastAnswersArr = answers.filter((item) => item.time < TimeResult.FAST);
    const slowAnswersArr = answers.filter((item) => item.time > TimeResult.SLOW);
    const correctAnswer = answers.filter((item) => item.answer > 0);

    const Point = {
      LEVEL: 100,
      BONUS: 50
    };

    const gamePoints = correctAnswer.length * Point.LEVEL;
    const fastAnswers = fastAnswersArr.length;
    const fastPoints = fastAnswers * Point.BONUS;
    const slowAnswers = slowAnswersArr.length;
    const slowPoints = slowAnswers * Point.BONUS * -1;
    const livePoints = lives * Point.BONUS;
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
