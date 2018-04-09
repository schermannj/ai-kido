const { make_thought } = require('../utils/board.utils');

const is_3x3_board = ({ board }) => board.length === 3 && board[0].length === 3;

const is_center_cell_empty = ({ board, space }) => board[1][1] === space;

/**
 * @params
 * factor = 0.1
 * payload.board: [[null, null, null], [null, 1, 0], [0, null, 1]]
 * payload.cursor: 1 - your sign (usually cross or circle)
 * payload.space: null - element that uses to mark empty cells
 */
module.exports = (name = 'center_cell') => (factor = 0.5) => payload => (
  is_3x3_board(payload) && is_center_cell_empty(payload)
    ? make_thought(name)(factor)([1, 1])
    : undefined
);
