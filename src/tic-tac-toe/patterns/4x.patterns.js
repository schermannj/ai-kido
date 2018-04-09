const { build_pattern } = require('../utils/pattern.utils');

/**
 * @description - the order of cells in pattern matters, basically it's the priority
 * off [x, y] - offset
 */
module.exports = ({ space }) => [
  build_pattern({}, { off: [1, 0] }, { off: [1, 0] }, { off: [1, 0] })({ space, name: '4h-line' }), // x x x x
  build_pattern(
    {},              // x
    { off: [0, 1] }, // x
    { off: [0, 1] }, // x
    { off: [0, 1] }  // x
  )({ space, name: '4v-line' }),
  build_pattern(
    {},              // x
    { off: [1, 1] }, //   x
    { off: [1, 1] }, //     x
    { off: [1, 1] }  //       x
  )({ space, name: '4d-line-right' }),
  build_pattern(
    {},               //       x
    { off: [-1, 1] }, //     x
    { off: [-1, 1] }, //   x
    { off: [-1, 1] }  // x
  )({ space, name: '4d-line-left' })
];
