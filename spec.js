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


      expect(game.markAt(1, 1)).toBe(empty);
      expect(game.markAt(1, 2)).toBe(empty);
      expect(game.markAt(1, 3)).toBe(empty);
      expect(game.markAt(2, 1)).toBe(empty);
      expect(game.markAt(2, 2)).toBe(empty);
      expect(game.markAt(2, 3)).toBe(empty);
      expect(game.markAt(3, 1)).toBe(empty);
      expect(game.markAt(3, 2)).toBe(empty);
      expect(game.markAt(3, 3)).toBe(empty);

    });

    it('can mark everything', () => {

      expect(game.canMark(1, 1)).toBe(true);
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

    describe('New game', () => {

      beforeEach(() => {

        game.reset();

      });

      for (let x = 1; x < 4; x++) {

        for (let y = 1; y < 4; y++) {

            it(`Can mark ${x}x${y}`, () => {

              game.mark(x, y);
              expect(game.markAt(x, y)).toEqual(player1);

            });

        }

      }

    });

  });

});
