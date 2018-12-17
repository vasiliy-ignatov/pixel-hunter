// входной формат данных
// const llevels = [
//   {type: "tinder-like", question: "Угадай, фото или рисунок?", answers: [
//     {image: {
//       height: 455,
//       url: "http://i.imgur.com/jBLSxQ9.png",
//       width: 304,
//     }, type: "painting"},
//     {image: {
//       height: 455,
//       url: "http://i.imgur.com/jBLSxQ9.png",
//       width: 304,
//     }, type: "painting"},
//     {image: {
//       height: 455,
//       url: "http://i.imgur.com/jBLSxQ9.png",
//       width: 304,
//     }, type: "photo"}
//   ]},
//   {type: "one-of-three", question: "Найдите рисунок среди изображений", answers: [
//     {image: {
//       height: 455,
//       url: "http://i.imgur.com/jBLSxQ9.png",
//       width: 304,
//     }, type: "painting"}
//   ]},
//   {type: "tinder-like", question: "Угадай, фото или рисунок?", answers: [
//     {image: {
//       height: 455,
//       url: "http://i.imgur.com/jBLSxQ9.png",
//       width: 304,
//     }, type: "painting"},
//     {image: {
//       height: 455,
//       url: "http://i.imgur.com/jBLSxQ9.png",
//       width: 304,
//     }, type: "painting"}
//   ]}
// ];
//
// // выходной формат данных
// const levels = {
//   'level-0': {
//     'images': [
//       `https://k42.kn3.net/D2F0370D6.jpg`,
//       `https://k32.kn3.net/5C7060EC5.jpg`,
//     ],
//     'answers': [`photo`, `paint`]
//   },
//   'level-1': {
//     'images': [`https://k42.kn3.net/D2F0370D6.jpg`],
//     'answers': [`photo`]
//   }
// };

const getLevelOptions = (dataItem) => {
  const result = {
    images: dataItem.map((item) => item.image.url),
    answers: dataItem.map((item) => item.type)
  }
  return result;
};

export const adaptServerData = (data) => {
  let newData = {};

  data.forEach((item, i) => {
    let itemOptions = getLevelOptions(item.answers);
    newData[`level-${i}`] = {};
    newData[`level-${i}`].answers = itemOptions.answers;
    newData[`level-${i}`].images = itemOptions.images;
  });

  return newData;
};
