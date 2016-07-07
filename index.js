(() => {

  'use strict';

  let isUndefined = require('is-undefined'),
    octothorpe = require('octothorpe'),
    state = Symbol('state');

  const emptyCell = ' ',
    player1 = 'X',
    player2 = 'O',
    wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

  module.exports = class Game {

    constructor() {

      this[state] = Array(9);
      this.reset();

    }

    reset() {

      this[state].fill(emptyCell);

    }

    markAt(x, y) {

      return this[state][indexOf(x, y)];

    }

    canMark(x, y) {

      return !this.hasEnded && this.markAt(x, y) === emptyCell;

    }

    get hasEnded() {

      return this.turn === 10 ||
        this.winner !== emptyCell;

    }

    get turn() {

      return this[state].filter(v => v !== emptyCell).length + 1;

    }

    get nextMark() {

      return this.turn % 2 === 1 ? player1 : player2;

    }

    mark(x, y) {

      if (this.canMark(x, y)) {

        this[state][indexOf(x, y)] = this.nextMark;

      }

    }

    get winner() {

      if (this.turn <= 5) {

        return emptyCell;

      }

      let win = wins.find(isWin, this[state]);

      if (!isUndefined(win)) {

        return this[state][win[0]];

      }

      return emptyCell;

    }

    toString() {

      return octothorpe(...this[state]);

    }

  };

  function isWin(indexes) {

    let values = indexes.map(i => this[i]),
      first = values[0];

    return first !== emptyCell && values.every(value => value === first);

  }

  function indexOf(x, y) {

    return (y - 1) * 3 + (x - 1);

  }

})();
