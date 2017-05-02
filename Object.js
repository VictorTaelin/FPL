const fromArray = keyVals => {
  let object = {};
  for (let i = 0, l = keyVals.length; i < l; ++i)
    object[keyVals[i][0]] = keyVals[i][1];
  return object;
}

const toArray = object => {
  let array = [];
  for (let key in object)
    array.push([key, object[key]]);
  return array;
}

const merge = a => b => {
  let c = {};
  for (let key in a)
    c[key] = a[key];
  for (let key in b)
    c[key] = b[key];
  return c;
}

module.exports = {
  fromArray,
  toArray,
  merge
}
