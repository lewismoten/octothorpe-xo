/* eslint-env jasmine */

const Lib = require('.'),
  empty = ' ',
  player1 = 'X',
  player2 = 'O',
  tieMarks = [
    {x: 2, y: 1},
    {x: 1, y: 1},

    {x: 3, y: 1},
    {x: 2, y: 2},

    {x: 1, y: 2},
    {x: 3, y: 2},

    {x: 2, y: 3},
    {x: 1, y: 3},

    {x: 3, y: 3}
  ];

describe('package', () => {

  'use strict';

  describe('new', () => {

    let game = new Lib();

    it('has no winner', () => {

      expect(game.winner).toBe(empty);

    });

    it('has not ended', () => {

      expect(game.hasEnded).toBe(false);

    });

    it('is on first turn', () => {

      expect(game.turn).toBe(1);

    });

    it('is first players turn', () => {

      expect(game.nextMark).toBe(player1);

    });

    it('has no marks', () => {

      tieMarks.forEach(xy => expect(game.markAt(xy.x, xy.y)).toBe(empty));

    });

    it('can mark everything', () => {

      tieMarks.forEach(xy => expect(game.canMark(xy.x, xy.y)).toBe(true));

    });

  });

  describe('Winning', () => {

    let game = new Lib();

    it('As player 1', () => {

      game.reset();
      game.mark(1, 1);
      game.mark(2, 1);
      game.mark(1, 2);
      game.mark(2, 2);
      game.mark(1, 3);
      expect(game.winner).toBe(player1);

    });
    it('As player 1', () => {

      game.reset();
      game.mark(1, 1);
      game.mark(2, 1);
      game.mark(1, 2);
      game.mark(2, 2);
      game.mark(3, 3);
      game.mark(2, 3);
      expect(game.winner).toBe(player2);

    });

    describe('Diagonal', () => {

      it('Back', () => {

        game.reset();
        game.mark(1, 1);
        game.mark(2, 1);
        game.mark(2, 2);
        game.mark(3, 1);
        game.mark(3, 3);
        expect(game.winner).toBe(player1);

      });

      it('Forward', () => {

        game.reset();
        game.mark(3, 1);
        game.mark(2, 1);
        game.mark(2, 2);
        game.mark(3, 3);
        game.mark(1, 3);
        expect(game.winner).toBe(player1);

      });

    });

    describe('Vertical', () => {

      it('Left', () => {

        game.reset();
        game.mark(1, 1);
        game.mark(2, 1);
        game.mark(1, 2);
        game.mark(2, 2);
        game.mark(1, 3);
        expect(game.winner).toBe(player1);

      });

      it('Center', () => {

        game.reset();
        game.mark(2, 1);
        game.mark(3, 1);
        game.mark(2, 2);
        game.mark(3, 2);
        game.mark(2, 3);
        expect(game.winner).toBe(player1);

      });

      it('Right', () => {

        game.reset();
        game.mark(3, 1);
        game.mark(2, 1);
        game.mark(3, 2);
        game.mark(2, 2);
        game.mark(3, 3);
        expect(game.winner).toBe(player1);

      });

    });

    describe('Horizontal', () => {

      it('Can win top row', () => {

        game.reset();
        game.mark(1, 1);
        game.mark(1, 2);
        game.mark(2, 1);
        game.mark(2, 2);
        game.mark(3, 1);
        expect(game.winner).toBe(player1);

      });

      it('Can win middle row', () => {

        game.reset();
        game.mark(1, 2);
        game.mark(1, 3);
        game.mark(2, 2);
        game.mark(2, 3);
        game.mark(3, 2);
        expect(game.winner).toBe(player1);

      });

      it('Can win bottom row', () => {

        game.reset();
        game.mark(1, 3);
        game.mark(1, 1);
        game.mark(2, 3);
        game.mark(2, 1);
        game.mark(3, 3);
        expect(game.winner).toBe(player1);

      });

    });

  });

  describe('first turn in upper left', () => {

    let game = new Lib();

    game.mark(1, 1);

    it('marked as player1', () => {

      expect(game.markAt(1, 1)).toEqual(player1);

    });

    it('has no winner', () => {

      expect(game.winner).toBe(empty);

    });

    it('has not ended', () => {

      expect(game.hasEnded).toBe(false);

    });

    it('is on second turn', () => {

      expect(game.turn).toBe(2);

    });

    it('is second players turn', () => {

      expect(game.nextMark).toBe(player2);

    });

    it('only has mark in upper left', () => {

      expect(game.markAt(1, 1)).toBe(player1);
      expect(game.markAt(1, 2)).toBe(empty);
      expect(game.markAt(1, 3)).toBe(empty);
      expect(game.markAt(2, 1)).toBe(empty);
      expect(game.markAt(2, 2)).toBe(empty);
      expect(game.markAt(2, 3)).toBe(empty);
      expect(game.markAt(3, 1)).toBe(empty);
      expect(game.markAt(3, 2)).toBe(empty);
      expect(game.markAt(3, 3)).toBe(empty);

    });

    it('can mark unmarked cells', () => {

      expect(game.canMark(1, 1)).toBe(false);
      expect(game.canMark(1, 2)).toBe(true);
      expect(game.canMark(1, 3)).toBe(true);
      expect(game.canMark(2, 1)).toBe(true);
      expect(game.canMark(2, 2)).toBe(true);
      expect(game.canMark(2, 3)).toBe(true);
      expect(game.canMark(3, 1)).toBe(true);
      expect(game.canMark(3, 2)).toBe(true);
      expect(game.canMark(3, 3)).toBe(true);

    });

  });

  describe('Can Mark', () => {

    describe('Marked Cell', () => {

      tieMarks.forEach(xy => {

        let game = new Lib();

        it(`${xy.x}x{xy.y}`, () => {

          game.reset();
          game.mark(xy.x, xy.y);
          expect(game.canMark(xy.x, xy.y)).toBe(false);

        });

      });

    });

    it('Can not mark after ended', () => {

      let game = new Lib();
      game.mark(1, 1);
      game.mark(2, 1);
      game.mark(1, 2);
      game.mark(2, 2);
      game.mark(1, 3);

      expect(game.canMark(2, 3)).toBe(false);

    });

    describe('Unmarked Cell', () => {

      tieMarks.forEach(xy => {

        let game = new Lib();

        it(`${xy.x}x{xy.y}`, () => {

          game.reset();
          expect(game.canMark(xy.x, xy.y)).toBe(true);

        });

      });

    });

  });

  describe('Has Ended', () => {

    it('Is not initially ended', () => {

      let game = new Lib();
      expect(game.hasEnded).toBe(false);

    });

    it('Ended game resets to not ended', () => {

      let game = new Lib();
      tieMarks.forEach(xy => game.mark(xy.x, xy.y));
      game.reset();
      expect(game.hasEnded).toBe(false);

    });

    tieMarks.forEach(xy => {

      let game = new Lib();

      it(`Tie-game Turn ${game.turn}`, () => {

        game.mark(xy.x, xy.y);
        expect(game.hasEnded).toBe(game.turn === 10);

      });

    });

  });

  describe('Turn', () => {

    let game = new Lib();

    it('starts on 1', () => {

      expect(game.turn).toBe(1);

    });

    tieMarks.forEach((xy, i) => {

      let expected = i + 2;

      it(`Turn ${expected}`, () => {

        game.mark(xy.x, xy.y);
        expect(game.turn).toBe(expected);

      });

    });

  });

  describe('Reset', () => {

    let game = new Lib();

    tieMarks.forEach(m => game.markAt(m.x, m.y));
    game.reset();

    it('has no winner', () => {

      expect(game.winner).toBe(empty);

    });

    it('has not ended', () => {

      expect(game.hasEnded).toBe(false);

    });

    it('is on first turn', () => {

      expect(game.turn).toBe(1);

    });

    it('is first players turn', () => {

      expect(game.nextMark).toBe(player1);

    });

    describe('Marks', () => {

      tieMarks.forEach(m => {

        it(`Can mark ${m.x}x${m.y}`, () => {

          expect(game.markAt(m.x, m.y)).toEqual(empty);

        });

      });

    });

  });

  describe('Mark', () => {

    let game = new Lib();

    describe('Player 1', () => {

      tieMarks.forEach(m => {

        it(`Can mark ${m.x}x${m.y}`, () => {

          game.reset();
          game.mark(m.x, m.y);
          expect(game.markAt(m.x, m.y)).toEqual(player1);

        });

      });

    });

    it('Can not be replaced', () => {

      game.reset();
      game.mark(1, 1);
      game.mark(1, 1);

      expect(game.markAt(1, 1)).toBe(player1);
      expect(game.turn).toBe(2);

    });

    describe('Player 2', () => {

      tieMarks.forEach((m, i) => {

        it(`Can mark ${m.x}x${m.y}`, () => {

          let p1 = tieMarks[(i + 1) % 9];
          game.reset();
          game.mark(p1.x, p1.y);
          game.mark(m.x, m.y);
          expect(game.markAt(m.x, m.y)).toEqual(player2);

        });

      });

    });

  });

});
