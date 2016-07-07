(() => {

  'use strict';

  let isUndefined = require('is-undefined'),
    template = require('indexed-template'),
    state = Symbol('state');

  const emptyCell = ' ',
    player1 = 'X',
    player2 = 'O',
    octothorp = template` ${0} | ${1} | ${2} \n-----------\n ${3} | ${4} | ${5} \n-----------\n ${6} | ${7} | ${8} `,
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

      this._grid = Array(9);
      this.reset();

    }

    reset() {

      this._grid.fill(emptyCell);

    }

    markAt(x, y) {

      return this._grid[indexOf(x, y)];

    }

    canMark(x, y) {

      return !this.hasEnded && this.markAt(x, y) === emptyCell;

    }

    get hasEnded() {

      return this.turn === 10 ||
        this.winner !== emptyCell;

    }

    get turn() {

      return this._grid.filter(v => v !== emptyCell).length + 1;

    }

    get nextMark() {

      return this.turn % 2 === 1 ? player1 : player2;

    }

    mark(x, y) {

      if (this.canMark(x, y)) {

        this._grid[indexOf(x, y)] = this.nextMark;

      }

    }

    get winner() {

      if (this.turn <= 5) {

        return emptyCell;

      }

      let win = wins.find(isWin, this._grid);

      if (!isUndefined(win)) {

        return this._grid[win[0]];

      }

      return emptyCell;

    }

    toString() {

      return octothorp(...this._grid);

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
