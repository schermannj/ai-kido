const get_board = ({ size, space }) => {
  const board = new Array(size)
    .fill(space)
    .map(() => new Array(size).fill(space).map(() => space));

  return Object.defineProperty(board, 'toString', {
    value: function () {
      return this.map(line => `[${line.join(', ')}]`).join('\n');
    }
  });
};

const make_move = ({ board, space }) => ({ cell, cursor }) => {
  const [x, y] = cell;

  if (board[y][x] !== space) throw new Error(`cell is not empty; content ${board[y][x]}`);

  board[y][x] = cursor;
};

const track_board = (label) => (val) => {
  console.log(`---${label}---\n`);
  console.log(val && val.toString());
  console.log('-------------\n');
  return val;
};

module.exports = {
  get_board,
  make_move,
  track_board
};
