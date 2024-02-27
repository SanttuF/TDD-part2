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

  tick() {
    // this.eraseBlock()
    this.board[0][1] = '.'
    this.pos[0] += 1
    this.placeBlock()
  }

  placeBlock() {
    const [row, col] = this.pos
    const block = this.block.toString().slice(0, -1)

    for (let i = 0; i < this.blockLength; i++) {
      for (let j = 0; j < this.blockLength; j++) {
        this.board[row+i][col+j] = block[i][j]
      }
    }
  }
  
  eraseBlock() {
    const [row, col] = this.pos
    const block = this.block.toString().slice(0, -1)

    for (let i = 0; i < this.blockLength; i++) {
      for (let j = 0; j < this.blockLength; j++) {
        this.board[row+i][col+j] = block[i][j]
      }
    }
  }
}