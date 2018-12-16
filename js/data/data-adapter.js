// входной формат данных
const llevels = [
  {0: {type: "tinder-like", question: "Угадай, фото или рисунок?", answers: [
    {0: {image: {
      height: 455,
      url: "http://i.imgur.com/jBLSxQ9.png",
      width: 304,
    }, type: "painting"}},
    {1: {image: {
      height: 455,
      url: "http://i.imgur.com/jBLSxQ9.png",
      width: 304,
    }, type: "painting"}},
    {2: {image: {
      height: 455,
      url: "http://i.imgur.com/jBLSxQ9.png",
      width: 304,
    }, type: "photo"}}
  ]}},
  {1: {type: "one-of-three", question: "Найдите рисунок среди изображений", answers: [
    {0: {image: {
      height: 455,
      url: "http://i.imgur.com/jBLSxQ9.png",
      width: 304,
    }, type: "painting"}}
  ]}},
  {2: {type: "tinder-like", question: "Угадай, фото или рисунок?", answers: [
    {0: {image: {
      height: 455,
      url: "http://i.imgur.com/jBLSxQ9.png",
      width: 304,
    }, type: "painting"}},
    {1: {image: {
      height: 455,
      url: "http://i.imgur.com/jBLSxQ9.png",
      width: 304,
    }, type: "painting"}}
  ]}}
];

// выходной формат данных
const levels = {
  'level-0': {
    'images': [
      `https://k42.kn3.net/D2F0370D6.jpg`,
      `https://k32.kn3.net/5C7060EC5.jpg`,
    ],
    'answers': [`photo`, `paint`]
  },
  'level-1': {
    'images': [`https://k42.kn3.net/D2F0370D6.jpg`],
    'answers': [`photo`]
  }
};
const getLevelImages = (answers) => {
  const images = [];
  for (const obj of Object.values(answers)) {
    images.push(obj[Object.keys(obj)].image.url);
  }
  return images;
};

const adaptServerData = (data) => {
  let newData = {};
  for (const level of Object.values(data)) {
    newData[`level-${Object.keys(level)}`] = {};
    newData[`level-${Object.keys(level)}`].images = getLevelImages(level[Object.keys(level)].answers);
  }
};

adaptServerData(llevels);
