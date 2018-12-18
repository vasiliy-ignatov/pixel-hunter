const getLevelOptions = (dataItem) => {
  const result = {
    images: dataItem.map((item) => item.image.url),
    answers: dataItem.map((item) => item.type)
  };

  return result;
};

export const adaptServerData = (data) => {
  let newData = {};

  data.forEach((item, i) => {
    let itemOptions = getLevelOptions(item.answers);
    newData[`level-${i}`] = {};
    newData[`level-${i}`].answers = itemOptions.answers;
    newData[`level-${i}`].images = itemOptions.images;
    newData[`level-${i}`].question = item.question;
  });

  return newData;
};
