export const getLastTimeMark = (data, key) => {
  let last = 0;
  data.forEach((element) => {
    if (element[key] > last) last = element[key];
  });
  return last;
};

export const mergeComments = (array1, array2) => {
  array2.forEach((element1) => {
    let isAlreadyinIndex = array1.findIndex((element2) => {
      return element1.id === element2.id;
    });

    if (isAlreadyinIndex === -1) {
      array1.push(element1);
    } else {
      array1[isAlreadyinIndex] = element1;
    }
  });

  return array1;
};
