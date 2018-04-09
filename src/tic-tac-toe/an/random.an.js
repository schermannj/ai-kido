const { pipe } = require('lodash/fp');
const { get_free_cells, make_thought } = require('../utils/board.utils');
const { rnd_element } = require('../utils/common');

/**
 * @params
 * factor = 0.1
 * payload.board: [[null, null, null], [null, 1, 0], [0, null, 1]]
 * payload.cursor: 1 - your sign (usually cross or circle)
 * payload.space: null - element that uses to mark empty cells
 */
module.exports = (name = 'random') => (factor = 0.5) => pipe(
  get_free_cells,
  rnd_element,
  make_thought(name)(factor)
);
