const { pipe, values, sortBy, filter, head, get } = require('lodash/fp');
const { random, pattern, center } = require('./an');
const { track } = require('./utils/common');

module.exports = ({ ai_cursor, player_cursor, space = null }) => board => pipe(
  values,
  filter(it => it),
  sortBy(it => it.score * -1),
  track('all thoughts'),
  head,
  get('thought')
)({
  r: random()(0.1)({ board, cursor: ai_cursor, space }),
  center: center()(5)({ board, cursor: ai_cursor, space }),
  defence: pattern('defence')(1.5)({ board, cursor: player_cursor, space }),
  offence: pattern('offence')(1.2)({ board, cursor: ai_cursor, space })
});
