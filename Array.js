const generate = n => fn => {
  let array = [];
  for (let i = 0; i < n; ++i)
    array[i] = fn(i);
  return array;
}

const replicate = n => x =>
  generate(n)(() => x);

const flatten = arrays => {
  let array = [];
  for (let j = 0, l = arrays.length; j < l; ++j)
    for (let i = 0, m = arrays[j].length; i < m; ++i)
      array.push(arrays[j][i]);
  return array;
}

module.exports = {
  generate,
  replicate,
  flatten
}
