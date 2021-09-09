import { Mark } from './Mark.js'

export class TicTacToe {
  static GRID_WIDTH = 3

  constructor() {
    this._grid = new Array(9).fill(Mark.Empty)
    this._lastMark = null
  }

  get(row, column) {
    return this._grid[this._determineIndex(row, column)]
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
      this._grid[this._determineIndex(row, column)] = mark
      this._lastMark = mark
    } else {
      throw new Error('Field already contains a mark.')
    }
  }

  determineWinner() {
    if (this._hasWon(Mark.X)) {
      return Mark.X
    } else if (this._hasWon(Mark.O)) {
      return Mark.O
    }
  }

  _isFirstMark() {
    return this._lastMark === null
  }
  
  _hasWon(mark) {
    return (
      (
        this.get(0, 0) === mark &&
        this.get(0, 1) === mark &&
        this.get(0, 2) === mark
      ) ||
      (
        this.get(1, 0) === mark &&
        this.get(1, 1) === mark &&
        this.get(1, 2) === mark
      ) ||
      (
        this.get(2, 0) === mark &&
        this.get(2, 1) === mark &&
        this.get(2, 2) === mark
      ) ||
      (
        this.get(0, 0) === mark &&
        this.get(1, 0) === mark &&
        this.get(2, 0) === mark
      ) ||
      (
        this.get(0, 1) === mark &&
        this.get(1, 1) === mark &&
        this.get(2, 1) === mark
      ) ||
      (
        this.get(0, 2) === mark &&
        this.get(1, 2) === mark &&
        this.get(2, 2) === mark
      ) ||
      (
        this.get(0, 0) === mark &&
        this.get(1, 1) === mark &&
        this.get(2, 2) === mark
      ) ||
      (
        this.get(0, 2) === mark &&
        this.get(1, 1) === mark &&
        this.get(2, 0) === mark
      )
    )
  }

  _determineIndex(row, column) {
    return row * TicTacToe.GRID_WIDTH + column
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
}
