function getPositiveRandomIntInclusive (min, max) {
  if (max < min || min < 0 || max < 0) {
    return undefined;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPositiveRandomFloatInclusive (min, max, fractionLength) {
  if (fractionLength < 0) {
    return undefined;
  }
  fractionLength = Math.floor(fractionLength);
  min = min * Math.pow(10, fractionLength);
  max = max * Math.pow(10, fractionLength);
  let result = getPositiveRandomIntInclusive(min, max);
  result = result / Math.pow(10, fractionLength);
  return result;
}

getPositiveRandomIntInclusive();
getPositiveRandomFloatInclusive();
