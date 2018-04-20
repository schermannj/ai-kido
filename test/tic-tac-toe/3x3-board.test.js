const test = require('ava');
const ai = require('../../src/tic-tac-toe');

const mock = {
  space: null,
  ai_cursor: 1,
  player_cursor: 0,
  size: 3
};

const ai_cfg = ai({ player_cursor: mock.player_cursor, ai_cursor: mock.ai_cursor });

test('3x3 board test 1', (t) => {
  const move_1 = ai_cfg([
    [0, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  t.deepEqual(move_1, [1, 1]);

  const move_2 = ai_cfg([
    [0, null, null],
    [0, 1, null],
    [null, null, null]
  ]);

  t.deepEqual(move_2, [0, 2]);

  const move_3 = ai_cfg([
    [0, null, null],
    [0, 1, null],
    [1, null, null]
  ]);

  t.deepEqual(move_3, [2, 0]);

  const move_4 = ai_cfg([
    [0, null, 0],
    [0, 1, null],
    [1, null, null]
  ]);

  t.deepEqual(move_4, [1, 0]);

  const move_5 = ai_cfg([
    [0, 1, 0],
    [0, 1, null],
    [1, null, null]
  ]);

  t.deepEqual(move_5, [1, 2]);
});

test('3x3 board test 2', (t) => {
  const move_1 = ai_cfg([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  t.deepEqual(move_1, [1, 1]);

  const move_2 = ai_cfg([
    [null, null, null],
    [0, 1, null],
    [null, null, null]
  ]);

  t.deepEqual(move_2, [0, 0]);

  const move_3 = ai_cfg([
    [1, null, null],
    [0, 1, null],
    [null, null, null]
  ]);

  t.deepEqual(move_3, [2, 2]);
});

test('3x3 board test fork', (t) => {
  const move_1 = ai_cfg([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  t.deepEqual(move_1, [1, 1]);

  const move_2 = ai_cfg([
    [null, 0, null],
    [null, 1, null],
    [null, null, null]
  ]);

  t.deepEqual(move_2, [0, 0]);

  const move_3 = ai_cfg([
    [1, 0, null],
    [null, 1, null],
    [null, null, 0]
  ]);

  t.deepEqual(move_3, [0, 1]);

  const move_4_1 = ai_cfg([
    [1,     0,  null],
    [1,     1,   0],
    [null, null, 0]
  ]);

  t.deepEqual(move_4_1, [0, 2]);
});

test('google impossible mode test', (t) => {
  const move_1 = ai_cfg([
    [null, null, null],
    [null, 0, null],
    [null, null, null]
  ]);

  t.deepEqual(move_1, [0, 0]);

  const move_2 = ai_cfg([
    [1, null, null],
    [null, 0, 0],
    [null, null, null]
  ]);

  t.deepEqual(move_2, [0, 1]);

  const move_3 = ai_cfg([
    [1, 0, null],
    [1, 0, 0],
    [null, null, null]
  ]);

  t.deepEqual(move_3, [0, 2]);

  const move_4 = ai_cfg([
    [1, null, null],
    [1, 0, 0],
    [0, null, null]
  ]);

  t.deepEqual(move_4, [2, 0]);

  const move_5 = ai_cfg([
    [1, null, 1],
    [1, 0, 0],
    [0, 0, null]
  ]);

  t.deepEqual(move_5, [1, 0]);
});
