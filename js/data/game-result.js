const TimeResult = {
  FAST: 20,
  SLOW: 10
};
const Point = {
  LEVEL: 100,
  BONUS: 50
};

export const getGameResult = (answers, lives) => {
  const ANSWERS_LENGTH = 10;
  if (answers.length !== ANSWERS_LENGTH) {
    return 0;
  } else {
    const fastAnswers = answers.filter((item) => item.time > TimeResult.FAST);
    const slowAnswers = answers.filter((item) => item.time < TimeResult.SLOW);
    const correctAnswers = answers.filter((item) => item.answer > 0);

    const result = {
      get gamePoints() {
        return correctAnswers.length * Point.LEVEL;
      },
      get fastAnswers() {
        return fastAnswers.length;
      },
      get fastPoints() {
        return result.fastAnswers * Point.BONUS;
      },
      get slowAnswers() {
        return slowAnswers.length;
      },
      get slowPoints() {
        return result.slowAnswers * Point.BONUS * -1;
      },
      get livePoints() {
        return lives * Point.BONUS;
      },
      get allPoints() {
        return result.gamePoints + result.fastPoints + result.livePoints + result.slowPoints;
      }
    };

    return result;
  }
};
