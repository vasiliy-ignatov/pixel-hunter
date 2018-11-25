import {assert} from 'chai';
import {calcGameResult} from './game-result.js';
import {INITIAL_GAME} from './quest.js';

describe(`Calc game result`, () => {
  it(`should bad length of answers`, () => {
    const smallArr = [...new Array(9)].map(() => [0, 0]);
    const largeArr = [...new Array(25)].map(() => [0, 0]);

    assert.equal(calcGameResult([], 0), -1);
    assert.equal(calcGameResult(smallArr, 0), -1);
    assert.equal(calcGameResult(largeArr, 0), -1);
  });
  it(`should average values`, () => {
    const anyArr = [...new Array(10)].map(() => {
      return {answer: 1, time: 15000};
    });
    assert.equal(calcGameResult(anyArr, INITIAL_GAME.lives), 1150);
  });
});

import {changeLevel} from './change-level.js';

describe(`Check level changer`, () => {
  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, /Level should not be negative value/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, undefined).level, /Level should be of type number/);
  });
});

import {changeLives} from './change-lives.js';

describe(`Check lives changer`, () => {
  it(`should update lives of the game`, () => {
    assert.equal(changeLives(INITIAL_GAME, 1).lives, 1);
    assert.equal(changeLives(INITIAL_GAME, 10).lives, 10);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, -1).lives, /Lives should not be negative value/);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, undefined).lives, /Lives should be of type number/);
  });
});

import {changeTime} from './change-time.js';

describe(`Check time changer`, () => {
  it(`should update time of the game`, () => {
    assert.equal(changeTime(INITIAL_GAME, 1).time, 1);
    assert.equal(changeTime(INITIAL_GAME, 10).time, 10);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, -1).time, /Time should not be negative value/);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, undefined).time, /Time should be of type number/);
  });
});
