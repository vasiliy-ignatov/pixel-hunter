const getLevelOptions = (dataItem) => {
  const result = {
    images: dataItem.map((item) => item.image.url),
    answers: dataItem.map((item) => item.type)
  };

  return result;
};

export const adaptServerData = (data) => {
  const newData = [];

  data.map((item) => {
    const obj = {};
    const itemOptions = getLevelOptions(item.answers);
    obj.answers = itemOptions.answers;
    obj.images = itemOptions.images;
    obj.question = item.question;

    newData.push(obj);
  });

  return newData;
};
