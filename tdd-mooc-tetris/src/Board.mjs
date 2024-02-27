import { Tetromino } from "./Tetromino.mjs";
export class Board {
  width;
  height;
  board;
  block;
  blockLength;
  pos;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(this.height).fill(null).map(() => new Array(this.width).fill('.'))
    this.block
    this.blockLength
    this.pos
  }

  toString() {
    let s = ''
    this.board.forEach(e => s += e.join('') + '\n')
    return s
  }

  drop(block) {
    if (!(block instanceof Tetromino)) {
      block = new Tetromino(block)
    }
    const mid = Math.ceil(this.width/2-1)

    this.block = block
    this.pos = [0, mid]
    this.blockLength = block.toString()[0].length

    this.placeBlock()
  }

  placeBlock() {
    const [x, y] = this.pos
    this.board[x][y] = this.block.toString().slice(0, -1)
  }
}