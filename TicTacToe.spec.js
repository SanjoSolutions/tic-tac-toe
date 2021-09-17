import { describe, test, expect, it } from '@jest/globals'
import { TicTacToe } from './TicTacToe.js'
import { Mark } from './Mark.js'

describe('TicTacToe', () => {
  describe('initial state', () => {
    test('all fields are empty', () => {
      const ticTacToe = new TicTacToe()
      expect(ticTacToe.get(0, 0)).toEqual(Mark.Empty)
      expect(ticTacToe.get(0, 1)).toEqual(Mark.Empty)
      expect(ticTacToe.get(0, 2)).toEqual(Mark.Empty)
      expect(ticTacToe.get(1, 0)).toEqual(Mark.Empty)
      expect(ticTacToe.get(1, 1)).toEqual(Mark.Empty)
      expect(ticTacToe.get(1, 2)).toEqual(Mark.Empty)
      expect(ticTacToe.get(2, 0)).toEqual(Mark.Empty)
      expect(ticTacToe.get(2, 1)).toEqual(Mark.Empty)
      expect(ticTacToe.get(2, 2)).toEqual(Mark.Empty)
    })

    test('setting a O throws an error', () => {
      const ticTacToe = new TicTacToe()
      expect(() => ticTacToe.set(0, 0, Mark.O))
        .toThrowError('Only a X can be set initially.')
    })
  })

  test('setting a field', () => {
    const ticTacToe = new TicTacToe()
    ticTacToe.set(0, 0, Mark.X)
    expect(ticTacToe.get(0, 0)).toEqual(Mark.X)
  })

  test('throws an error when field is set to Mark.Empty', () => {
    const ticTacToe = new TicTacToe()
    expect(() => ticTacToe.set(0, 0, Mark.Empty)).toThrowError(
      'Field can only be set to X or O.'
    )
  })

  test('a field can only be set when it is empty', () => {
    const ticTacToe = new TicTacToe()
    ticTacToe.set(0, 0, Mark.X)
    expect(() => ticTacToe.set(0, 0, Mark.O))
      .toThrowError('Field already contains a mark.')
  })

  test('setting a X after X throws an error', () => {
    const ticTacToe = new TicTacToe()
    ticTacToe.set(0, 0, Mark.X)
    expect(() => ticTacToe.set(0, 1, Mark.X))
      .toThrowError('After a X only a O can be set.')
  })

  test('setting a O after O throws an error', () => {
    const ticTacToe = new TicTacToe()
    ticTacToe.set(0, 0, Mark.X)
    ticTacToe.set(0, 1, Mark.O)
    expect(() => ticTacToe.set(0, 2, Mark.O))
      .toThrowError('After a O only a X can be set.')
  })

  describe('determineWinner', () => {
    describe('conditions for when player with mark X has won', () => {
      it('returns X when the player with the mark X has three Xs in the first row', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 0, Mark.X)
        ticTacToe.set(1, 0, Mark.O)
        ticTacToe.set(0, 1, Mark.X)
        ticTacToe.set(1, 1, Mark.O)
        ticTacToe.set(0, 2, Mark.X)
        expect(ticTacToe.determineWinner()).toEqual(Mark.X)
      })

      it('returns X when the player with the mark X has three Xs in the second row', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(1, 0, Mark.X)
        ticTacToe.set(2, 0, Mark.O)
        ticTacToe.set(1, 1, Mark.X)
        ticTacToe.set(2, 1, Mark.O)
        ticTacToe.set(1, 2, Mark.X)
        expect(ticTacToe.determineWinner()).toEqual(Mark.X)
      })

      it('returns X when the player with the mark X has three Xs in the third row', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(2, 0, Mark.X)
        ticTacToe.set(1, 0, Mark.O)
        ticTacToe.set(2, 1, Mark.X)
        ticTacToe.set(1, 1, Mark.O)
        ticTacToe.set(2, 2, Mark.X)
        expect(ticTacToe.determineWinner()).toEqual(Mark.X)
      })

      it('returns X when the player with the mark X has three Xs in the first column', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 0, Mark.X)
        ticTacToe.set(0, 1, Mark.O)
        ticTacToe.set(1, 0, Mark.X)
        ticTacToe.set(1, 1, Mark.O)
        ticTacToe.set(2, 0, Mark.X)
        expect(ticTacToe.determineWinner()).toEqual(Mark.X)
      })

      it('returns X when the player with the mark X has three Xs in the second column', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 1, Mark.X)
        ticTacToe.set(0, 2, Mark.O)
        ticTacToe.set(1, 1, Mark.X)
        ticTacToe.set(1, 2, Mark.O)
        ticTacToe.set(2, 1, Mark.X)
        expect(ticTacToe.determineWinner()).toEqual(Mark.X)
      })

      it('returns X when the player with the mark X has three Xs in the third column', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 2, Mark.X)
        ticTacToe.set(0, 1, Mark.O)
        ticTacToe.set(1, 2, Mark.X)
        ticTacToe.set(1, 1, Mark.O)
        ticTacToe.set(2, 2, Mark.X)
        expect(ticTacToe.determineWinner()).toEqual(Mark.X)
      })

      it('returns X when the player with the mark X has three Xs in the diagonal from the top left to the bottom right', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 0, Mark.X)
        ticTacToe.set(0, 1, Mark.O)
        ticTacToe.set(1, 1, Mark.X)
        ticTacToe.set(0, 2, Mark.O)
        ticTacToe.set(2, 2, Mark.X)
        expect(ticTacToe.determineWinner()).toEqual(Mark.X)
      })

      it('returns X when the player with the mark X has three Xs in the diagonal from the top right to the bottom left', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 2, Mark.X)
        ticTacToe.set(0, 0, Mark.O)
        ticTacToe.set(1, 1, Mark.X)
        ticTacToe.set(0, 1, Mark.O)
        ticTacToe.set(2, 0, Mark.X)
        expect(ticTacToe.determineWinner()).toEqual(Mark.X)
      })
    })

    describe('conditions for when player with mark O has won', () => {
      it('returns O when the player with the mark O has three Os in the first row', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(1, 0, Mark.X)
        ticTacToe.set(0, 0, Mark.O)
        ticTacToe.set(1, 1, Mark.X)
        ticTacToe.set(0, 1, Mark.O)
        ticTacToe.set(2, 2, Mark.X)
        ticTacToe.set(0, 2, Mark.O)
        expect(ticTacToe.determineWinner()).toEqual(Mark.O)
      })

      it('returns O when the player with the mark O has three Os in the second row', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(2, 0, Mark.X)
        ticTacToe.set(1, 0, Mark.O)
        ticTacToe.set(2, 1, Mark.X)
        ticTacToe.set(1, 1, Mark.O)
        ticTacToe.set(0, 2, Mark.X)
        ticTacToe.set(1, 2, Mark.O)
        expect(ticTacToe.determineWinner()).toEqual(Mark.O)
      })

      it('returns O when the player with the mark O has three Os in the third row', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(1, 0, Mark.X)
        ticTacToe.set(2, 0, Mark.O)
        ticTacToe.set(1, 1, Mark.X)
        ticTacToe.set(2, 1, Mark.O)
        ticTacToe.set(0, 2, Mark.X)
        ticTacToe.set(2, 2, Mark.O)
        expect(ticTacToe.determineWinner()).toEqual(Mark.O)
      })

      it('returns O when the player with the mark O has three Os in the first column', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 1, Mark.X)
        ticTacToe.set(0, 0, Mark.O)
        ticTacToe.set(1, 1, Mark.X)
        ticTacToe.set(1, 0, Mark.O)
        ticTacToe.set(2, 2, Mark.X)
        ticTacToe.set(2, 0, Mark.O)
        expect(ticTacToe.determineWinner()).toEqual(Mark.O)
      })

      it('returns O when the player with the mark O has three Os in the second column', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 2, Mark.X)
        ticTacToe.set(0, 1, Mark.O)
        ticTacToe.set(1, 2, Mark.X)
        ticTacToe.set(1, 1, Mark.O)
        ticTacToe.set(2, 0, Mark.X)
        ticTacToe.set(2, 1, Mark.O)
        expect(ticTacToe.determineWinner()).toEqual(Mark.O)
      })

      it('returns O when the player with the mark O has three Os in the third column', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 1, Mark.X)
        ticTacToe.set(0, 2, Mark.O)
        ticTacToe.set(1, 1, Mark.X)
        ticTacToe.set(1, 2, Mark.O)
        ticTacToe.set(2, 0, Mark.X)
        ticTacToe.set(2, 2, Mark.O)
        expect(ticTacToe.determineWinner()).toEqual(Mark.O)
      })

      it('returns O when the player with the mark O has three Os in the diagonal from the top left to the bottom right', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 1, Mark.X)
        ticTacToe.set(0, 0, Mark.O)
        ticTacToe.set(0, 2, Mark.X)
        ticTacToe.set(1, 1, Mark.O)
        ticTacToe.set(1, 2, Mark.X)
        ticTacToe.set(2, 2, Mark.O)
        expect(ticTacToe.determineWinner()).toEqual(Mark.O)
      })

      it('returns O when the player with the mark O has three Os in the diagonal from the top right to the bottom left', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe.set(0, 0, Mark.X)
        ticTacToe.set(0, 2, Mark.O)
        ticTacToe.set(0, 1, Mark.X)
        ticTacToe.set(1, 1, Mark.O)
        ticTacToe.set(1, 0, Mark.X)
        ticTacToe.set(2, 0, Mark.O)
        expect(ticTacToe.determineWinner()).toEqual(Mark.O)
      })
    })
  })

  describe('getWinnerFields', () => {
    const ticTacToe = new TicTacToe()
    ticTacToe.set(0, 0, Mark.X)
    ticTacToe.set(1, 0, Mark.O)
    ticTacToe.set(0, 1, Mark.X)
    ticTacToe.set(1, 1, Mark.O)
    ticTacToe.set(0, 2, Mark.X)
    expect(ticTacToe.getWinnerFields()).toEqual([
      {row: 0, column: 0},
      {row: 0, column: 1},
      {row: 0, column: 2}
    ])
  })
})
