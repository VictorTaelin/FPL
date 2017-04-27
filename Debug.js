const sample = (() => {
  var last = {};
  var odds = {};
  return (id, delay, fn) => {
    if (!odds[id] || Math.random() < odds[id]) {
      odds[id] = (odds[id]||0.5) * (Date.now() / 1000 - last[id] > delay ? 1.15 : 1/1.15);
      last[id] = Date.now() / 1000;
      fn();
    }
  }
})();

const callsPerSecond = (fn) => {
  for (var i = 0, t = Date.now(); Date.now() - t < 500; ++i)
    fn();
  return i;
}

const trace = (x) => {
  console.log(x);
  return x;
}

const traceWith = (fn,x) => {
  console.log(fn(x));
  return x;
}

module.exports = {
  sample,
  callsPerSecond,
  trace,
  traceWith
}
