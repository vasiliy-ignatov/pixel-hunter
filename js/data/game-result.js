export const calcGameResult = (answers, lives) => {
  const ANSWERS_LENGTH = 10;
  if (answers.length !== ANSWERS_LENGTH) {
    return 0;
  } else {
    const CORRECT_ANSWER = 100;
    const GOOD_TIME = 10000;
    const BAD_TIME = 20000;
    const BONUS = 50;

    const calcAnswers = answers.reduce((prev, cur) => {
      return prev + cur.answer;
    }, 0) * CORRECT_ANSWER;

    const calcTime = answers.reduce((prev, cur) => {
      if (cur.time <= GOOD_TIME) {
        prev += BONUS;
      } else if (cur.time >= BAD_TIME) {
        prev -= BONUS;
      }
      return prev;
    }, 0);

    const calcLives = lives * BONUS;

    const result = {
      'levelPoints': calcAnswers,
      'bonusPoints': calcTime + calcLives,
      'allPoints': calcAnswers + calcTime + calcLives
    };
    return (result.allPoints > 0) ? result : 0;
  }
};
