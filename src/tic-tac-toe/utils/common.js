const { pipe } = require('lodash/fp');

const rnd_digit = max => Math.floor(Math.random() * max);

const rnd_element = arr => pipe(rnd_digit, index => arr[index])(arr.length);

const track = (label) => (val) => {
  console.log(`${label}:`, '\n', val, '\n');
  return val;
};

module.exports = {
  rnd_digit,
  rnd_element,
  track
};
