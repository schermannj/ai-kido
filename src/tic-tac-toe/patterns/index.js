const patterns_3x3 = require('./3x3.patterns');
const patterns_4x = require('./4x.patterns');
const patterns_5x = require('./5x.patterns');

module.exports = (cfg) => [
  ...patterns_3x3(cfg),
  ...patterns_4x(cfg),
  ...patterns_5x(cfg)
];