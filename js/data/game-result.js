const TimeResult = {
  FAST: 10,
  SLOW: 20
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

    const fastAnswersArr = answers.filter((item) => item.time < TimeResult.FAST);
    const slowAnswersArr = answers.filter((item) => item.time > TimeResult.SLOW);
    const correctAnswer = answers.filter((item) => item.answer > 0);

    const result = {
      get gamePoints() {
        return correctAnswer.length * Point.LEVEL;
      },
      get fastAnswers() {
        return fastAnswersArr.length;
      },
      get fastPoints() {
        return result.fastAnswers * Point.BONUS;
      },
      get slowAnswers() {
        return slowAnswersArr.length;
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
