const TimeResult = {
  FAST: 20,
  SLOW: 10
};
const Point = {
  LEVEL: 100,
  BONUS: 50
};
const ANSWERS_LENGTH = 10;

export const getGameResult = (answers, lives) => {
  if (answers.length !== ANSWERS_LENGTH) {
    return 0;
  } else {
    const fastAnswers = [];
    const slowAnswers = [];
    const correctAnswers = [];

    for (const item of answers) {
      if (item.time > TimeResult.FAST) {
        fastAnswers.push(item);
      }
      if (item.time < TimeResult.SLOW) {
        slowAnswers.push(item);
      }
      if (item.answer > 0) {
        correctAnswers.push(item);
      }
    }

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
