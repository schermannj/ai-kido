const { pipe, head } = require('lodash/fp');

const part_properties = ({ index, arr }) => ({
  next: {
    enumerable: false,
    value: () => {
      if (index < arr.length - 1) return arr[index + 1];
      else return undefined;
    }
  },
  has_next: {
    enumerable: false,
    value: () => index + 1 < arr.length
  },
  set_meta: {
    value: function (meta) {
      if (!Object.hasOwnProperty('meta')) Object.defineProperty(this, 'meta', { value: meta });
    }
  }
});

const pattern_properties = ({ space, weight = 1, name }) => ({
  /**
   * @param position [x, y] - position of the first part
   * @param available_positions [[x, y]] - list of all available positions on the board
   * @param borders [x, y] - capacity of the board e.g. 3x3
   */
  fill: {
    value: function (position, available_positions, borders, pattern_part) {
      const part = pattern_part || head(this);

      const [prevX, prevY] = position;
      const [offX = 0, offY = 0] = part.off || [];
      const [borderX, borderY] = borders;

      part.pos = [prevX + offX, prevY + offY];

      const [x, y] = part.pos;
      const isBeyondWithXOffset = x < 0 || x >= borderX;
      const isBeyondWithYOffset = y < 0 || y >= borderY;
      const cell = available_positions.find(it => it[0] === x && it[1] === y);

      if (!cell || isBeyondWithXOffset || isBeyondWithYOffset) this.invalidate();
      else part.set_meta(cell.meta);

      return part.has_next() && !this.invalid
        ? this.fill(part.pos, available_positions, borders, part.next())
        : this;
    }
  },
  invalidate: {
    value: function () {
      Object.defineProperty(this, 'invalid', { value: true });
    }
  },
  saturation: {
    value: function () {
      return this.filter(it => it.meta.content !== this.meta.space).length / this.length;
    }
  },
  score: {
    value: function () {
      return this.saturation() * weight;
    }
  },
  meta: {
    value: { space, weight, name }
  }
});

/**
 * @param {T=} part
 * @param {number=} index
 * @param {Array=} arr
 */
const build_part = (part, index, arr) => pipe(
  part_properties,
  props => Object.defineProperties(part, props)
)({ index, arr });

const build_pattern = (...parts) => ({ weight = 1.0, space, name }) => pipe(
  () => parts.map(build_part),
  pattern => Object.defineProperties(pattern, pattern_properties({ weight, space, name }))
)();

module.exports = {
  build_pattern
};