// Allow you to call a function repeatedly, except it is
// only actually called once every `delay` secs in average. 
// Ex: setInterval(() => sample("a", 0.5, fn), 50);
// Here, `fn` is called only once every ~0.5s.
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

// Returns the amount of times `fn` was called in a second.
const callsPerSecond = (fn) => {
  for (var i = 0, t = Date.now(); Date.now() - t < 500; ++i)
    fn();
  return i * 2;
}

// Logs `fn(x)`, returns x.
const traceWith = (fn,x) => {
  console.log(fn(x));
  return x;
}

// Logs `x` and returns it.
const trace = x =>
  traceWith(x => x, x);

// Logs `fn(x)` sampled, returns x.
const sampleTraceWith = (id, delay, fn, x) => {
  sample(id,delay, () => console.log(fn(x)));
  return x;
}

// Logs `x` sampled and returns it.
const sampleTrace = (id, delay, x) =>
  sampleTraceWith(id, delay, x => x, x);

module.exports = {
  sample,
  callsPerSecond,
  trace,
  traceWith,
  sampleTrace,
  sampleTraceWith
}
