import { Tetromino } from "./Tetromino.mjs";
export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(this.height).fill(null).map(() => new Array(this.width).fill('.'))
  }

  toString() {
    let s = ''
    this.board.forEach(e => s += e.join('') + '\n')
    return s
  }

  drop(block) {
    const mid = Math.ceil(this.width/2-1)
    this.board[0][mid] = block
  }
}