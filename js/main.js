const getPositiveRandomIntInclusive = (min, max) => {
  if (max < min || min < 0) {
    return null;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getPositiveRandomFloatInclusive = (min, max, fractionLength) => {
  if (max < min || min < 0 || fractionLength < 0) {
    return null;
  }
  fractionLength = Math.floor(fractionLength);
  min = min * Math.pow(10, fractionLength);
  max = max * Math.pow(10, fractionLength);
  const result = getPositiveRandomIntInclusive(min, max);
  return result / Math.pow(10, fractionLength);
};

getPositiveRandomIntInclusive();
getPositiveRandomFloatInclusive();
