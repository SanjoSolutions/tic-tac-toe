import { TicTacToe } from './TicTacToe.js'
import { Mark } from './Mark.js'

export function main() {
  const ticTacToe = new TicTacToe()
  let mark = Mark.X

  const grid = document.querySelector('.grid')
  const fields = Array.from(document.querySelectorAll('.field'))
  grid.addEventListener('click', function (event) {
    if (ticTacToe.determineWinner() === undefined) {
      const { target } = event
      if (target.classList.contains('field')) {
        const index = fields.indexOf(target)
        const row = Math.floor(index / TicTacToe.GRID_WIDTH)
        const column = index % TicTacToe.GRID_WIDTH
        if (ticTacToe.get(row, column) === Mark.Empty) {
          ticTacToe.set(row, column, mark)
          const winnerFields = ticTacToe.getWinnerFields()
          if (winnerFields) {
            for (const winnerField of winnerFields) {
              const {row, column} = winnerField
              const index = ticTacToe.determineIndex(row, column)
              const $field = fields[index]
              $field.classList.add('field--winner')
            }
          }
          target.textContent = mark
          mark = determineNextMark(mark)
        }
      }
    }
  })
}

function determineNextMark(mark) {
  if (mark === Mark.X) {
    return Mark.O
  } else if (mark === Mark.O) {
    return Mark.X
  }
}
