const { build_pattern } = require('../utils/pattern.utils');

/**
 * @description - the order of cells in pattern matters, basically it's the priority
 * off [x, y] - offset
 */
module.exports = ({ space }) => [
  build_pattern({}, { off: [1, 0] }, { off: [1, 0] })({ space, name: 'h-line' }), // x x x
  build_pattern(
    {},              // x
    { off: [0, 1] }, // x
    { off: [0, 1] }  // x
  )({ space, name: 'v-line' }),
  build_pattern(
    {},              // x
    { off: [1, 1] }, //   x
    { off: [1, 1] }  //     x
  )({ space, name: 'd-line-right' }),
  build_pattern(
    {},               //     x
    { off: [-1, 1] }, //   x
    { off: [-1, 1] }  // x
  )({ space, name: 'd-line-left' }),
  build_pattern(
    {},               // x
    { off: [0, 1] },  // x x
    { off: [1, 0] }, //      x
    { off: [1, 1] }
  )({ space, name: 'd-line+half-v-line' }),
  build_pattern(
    {},              // x
    { off: [0, 1] }, // x x x
    { off: [1, 0] },
    { off: [1, 0] }
  )({ space, name: 'h-line+half-v-line' }),
  build_pattern(
    {},              //     x
    { off: [0, 1] }, // x x x
    { off: [-1, 0] },
    { off: [-1, 0] }
  )({ space, name: 'h-line+half-v-line' }),
  build_pattern(
    {},               // x
    { off: [0, 1] },  // x x
    { off: [1, 0] },  // x
    { off: [-1, 1] }
  )({ space, name: 'v-line+half-h-line' }),
  build_pattern(
    {},               //   x
    { off: [0, 1] },  // x x
    { off: [-1, 0] }, //   x
    { off: [1, 1] }
  )({ space, name: 'v-line+half-h-line-referce' })
];
