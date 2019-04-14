export const getTotalTime = (time) => {
  let timeKey = Object.keys(time);
  let timeVals = Object.values(time);
  let result = 0;
  for (let i = 0; i < timeKey.length; i++) {
    result += (timeKey.map(Number)[i] * timeVals[i]);
  }
  return result;
};

export const getMaxItem = (items) => {
  let max = 0;
  let maxItem = ``;
  for (let name in items) {
    if (max < items[name]) {
      max = items[name];
      maxItem = name;
    }
  }
  return maxItem;
};
