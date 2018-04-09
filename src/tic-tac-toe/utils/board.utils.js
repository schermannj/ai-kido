const cell_properties = space => ({
  meta: {
    value: {
      content: space
    }
  }
});

const build_cell = ({ x, y, space }) => Object.defineProperties([x, y], cell_properties(space));

const get_free_cells = ({ board, space }) => {
  const cells = [];

  board.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === space) cells.push(build_cell({ x, y, space }));
    });
  });

  return cells;
};

const make_thought = name => score => cell => (
  cell
    ? { name, score, thought: cell }
    : null
);

module.exports = {
  get_free_cells,
  make_thought
};
