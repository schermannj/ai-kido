const { pipe, map, filter, head, flatten, sortBy } = require('lodash/fp');
const { get_free_cells, make_thought } = require('../utils/board.utils');
const patterns = require('../patterns');

// use each position to build patterns
const map_available_positions = ({ board, space, available_positions }) => position => patterns({ space })
  .map(it => it.fill(position, available_positions, get_borders(board)));

const map_move = space => pattern => (
  pattern
    ? {
      cell: pattern.find(it => it.meta.content === space).pos,
      score: pattern.score(),
      pattern
    }
    : undefined
);

const map_thought = name => factor => move => (
  move
    ? Object.assign({}, make_thought(name)(factor * move.score)(move.cell), { pattern: move.pattern.meta.name })
    : undefined
);

const get_borders = board => [board[0].length, board.length];

module.exports = (name = 'pattern') => (factor = 0.6) => ({ board, cursor, space }) => pipe(
  () => [
    ...get_free_cells({ board, space }),
    ...get_free_cells({ board, space: cursor })
  ],
  available_positions => map(map_available_positions({ board, space, available_positions }))(available_positions),
  flatten,
  filter(it => !it.invalid), // filter out patterns that are out of the borders
  filter(it => it.saturation() !== 1), // filter out full patterns
  sortBy(it => it.score() * -1), // sort desc
  head,
  map_move(space),
  map_thought(name)(factor)
)();
