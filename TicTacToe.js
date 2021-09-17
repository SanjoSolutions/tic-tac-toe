import { Mark } from './Mark.js'

export class TicTacToe {
  static GRID_WIDTH = 3

  constructor() {
    this._grid = new Array(9).fill(Mark.Empty)
    this._lastMark = null
  }

  get(row, column) {
    return this._grid[this.determineIndex(row, column)]
  }

  set(row, column, mark) {
    if (mark !== Mark.X && mark !== Mark.O) {
      throw new Error('Field can only be set to X or O.')
    } else if (this._isFirstMark() && mark !== Mark.X) {
      throw new Error('Only a X can be set initially.')
    } else if (this._lastMark === mark) {
      const markThatCanBePlayed = this._determineMarkThatCanBePlayedAfter(this._lastMark)
      throw new Error(
        `After a ${this._lastMark} only a ${markThatCanBePlayed} can be set.`
      )
    } else if (this.get(row, column) === Mark.Empty) {
      this._grid[this.determineIndex(row, column)] = mark
      this._lastMark = mark
    } else {
      throw new Error('Field already contains a mark.')
    }
  }

  determineIndex(row, column) {
    return row * TicTacToe.GRID_WIDTH + column
  }

  determineWinner() {
    if (this._hasWon(Mark.X)) {
      return Mark.X
    } else if (this._hasWon(Mark.O)) {
      return Mark.O
    }
  }

  getWinnerFields() {
    return this._getWinnerFields(Mark.X) || this._getWinnerFields(Mark.O) || null
  }

  _isFirstMark() {
    return this._lastMark === null
  }

  _determineMarkThatCanBePlayedAfter(mark) {
    let markThatCanBePlayedAfter
    if (mark === Mark.X) {
      markThatCanBePlayedAfter = Mark.O
    } else if (mark === Mark.O) {
      markThatCanBePlayedAfter = Mark.X
    }
    return markThatCanBePlayedAfter
  }

  _hasWon(mark) {
    const winnerFields = this._getWinnerFields(mark)
    return winnerFields && winnerFields.length === 3
  }

  _getWinnerFields(mark) {
    return fieldCombinations.find(
      fieldCombination => this._hasWonWith(fieldCombination, mark)
    )
  }

  _hasWonWith(fieldCombination, mark) {
    return fieldCombination.every(field => this._hasMark(field, mark))
  }

  _hasMark(field, mark) {
    const {row, column} = field
    return this.get(row, column) === mark
  }
}

const fieldCombinations = [
  [
    {row: 0, column: 0},
    {row: 0, column: 1},
    {row: 0, column: 2},
  ],
  [
    {row: 1, column: 0},
    {row: 1, column: 1},
    {row: 1, column: 2},
  ],
  [
    {row: 2, column: 0},
    {row: 2, column: 1},
    {row: 2, column: 2},
  ],
  [
    {row: 0, column: 0},
    {row: 1, column: 0},
    {row: 2, column: 0},
  ],
  [
    {row: 0, column: 1},
    {row: 1, column: 1},
    {row: 2, column: 1},
  ],
  [
    {row: 0, column: 2},
    {row: 1, column: 2},
    {row: 2, column: 2},
  ],
  [
    {row: 0, column: 0},
    {row: 1, column: 1},
    {row: 2, column: 2},
  ],
  [
    {row: 0, column: 2},
    {row: 1, column: 1},
    {row: 2, column: 0},
  ]
]
