# Octothorpe X/O

A game of tic-tac-toe.

The game will alternate between whose turn it is after each mark is placed. It evaluates if the game has been won or came to a draw.

## Example

```javascript
let Game = require('octothorpe-xo'),
  game = new Game();

game.turn;
// 1

game.mark(1, 1);
// marks top left with X

game.markAt(1, 1);
// X

game.nextMark;
// O

game.mark(2, 1);
// marks top center with O

game.mark(1, 2);
game.mark(3, 1);
game.mark(1, 3);

game.hasEnded;
// true

game.winner;
// X

game.toString();
/*
 X | O | O
-----------
 X |   |
-----------
 X |   |
*/

game.reset();
// board is reset
```
## Installation
```
$ npm install octothorpe-xo
```
## API
```javascript
var Game = require('octothorpe-xo');
```

### .canMark(x, y)

Evaluates if the specified cell is empty.

| type | data type | name | Description |
| --- | --- | --- | --- |
| parameter | integer | x | The horizontal position (1 - 3) |
| parameter | integer | y | The vertical position (1 - 3) |
| returns | boolean | n/a | true if empty, otherwise false. |

### .hasEnded

Evaluates if the game has a winner, or the board is full.

| type | data type | name | Description |
| --- | --- | --- | --- |
| returns | boolean | n/a | true if game has ended, otherwise false. |

### .mark(x, y)

Places a mark at the specified coordinates.

| type | data type | name | Description |
| --- | --- | --- | --- |
| parameter | integer | x | The horizontal position (1 - 3) |
| parameter | integer | y | The vertical position (1 - 3) |

### .markAt(x, y)

Returns the mark that is occupying the specified cell.

| type | data type | name | Description |
| --- | --- | --- | --- |
| parameter | integer | x | The horizontal position (1 - 3) |
| parameter | integer | y | The vertical position (1 - 3) |
| returns | string | n/a | 'X', 'Y' or ' ' |

### .nextMark

The next mark that will be placed on the board.

| type | data type | name | Description |
| --- | --- | --- | --- |
| returns | string | n/a | 'X' for odd numbered turns, otherwise 'O' |

### .reset()

Wipes the board and starts a new game.

### .toString()

Returns a text version of the game drawn out.

| type | data type | name | Description |
| --- | --- | --- | --- |
| returns | string | n/a | The text representing the game. |

```
 X | O | O
-----------
 X |   |
-----------
 X |   |
```

### .turn

The turn that the player is taking, starting with 1 on a new game.

| type | data type | name | Description |
| --- | --- | --- | --- |
| returns | integer | n/a | The current move number to be taken |


### .winner

The mark that won the game.

| type | data type | name | Description |
| --- | --- | --- | --- |
| returns | string | n/a | 'X', 'Y' or ' '  for games at a draw. |
