import { Tetromino } from "./Tetromino.mjs";
export class Board {
  width;
  height;
  board;
  block;
  blockLength;
  pos;
  falling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(this.height).fill(null).map(() => new Array(this.width).fill('.'))
    this.block
    this.blockLength
    this.pos
    this.falling
  }

  toString() {
    let s = ''
    this.board.forEach(e => s += e.join('') + '\n')
    return s
  }

  drop(block) {
    if(this.falling) throw new Error('already falling')

    if (!(block instanceof Tetromino)) {
      block = new Tetromino(block)
    }

    this.block = block
    this.blockLength = block.giveShape().length

    const start = Math.ceil(this.width/2-1) - Math.floor(this.blockLength/2)
    this.pos = [0, start]
    
    this.placeBlock()
    this.falling = true
  }

  tick() {
    this.moveDown()
  }

  hasFalling() {
    return this.falling
  }

  moveDown() {
    const [row, col] = this.pos
    this.eraseBlock()

    if (this.checkCollision(row + 1, col)) {
      this.falling = false
      this.placeBlock()
      return
    }

    this.pos[0] += 1
    this.placeBlock()
  }

  moveLeft() {
    const [row, col] = this.pos
    this.eraseBlock()

    if (this.checkCollision(row, col - 1)) {
      this.falling = false
      this.placeBlock()
      return
    }

    this.pos[1] -= 1
    this.placeBlock()
  }

  checkCollision(row, col) {
    const block = this.block.giveShape()

    for (let i = 0; i < this.blockLength; i++) {
      for (let j = 0; j < this.blockLength; j++) {
        if (block[i][j] === '.') continue

        if (row + i >= this.height || this.board[row+i][col+j] !== '.') {
          return true
        }
      }
    }
    return false
  }

  placeBlock() {
    this.blockWriter('place')
  }
  
  eraseBlock() {
    this.blockWriter('erase')
  }

  blockWriter(mode) {
    const [row, col] = this.pos
    const block = this.block.giveShape()

    for (let i = 0; i < this.blockLength; i++) {
      for (let j = 0; j < this.blockLength; j++) {
        if (block[i][j] === '.') continue

        if (mode === 'erase') {
          this.board[row+i][col+j] = '.'
        } else if (mode === 'place') {
          this.board[row+i][col+j] = block[i][j]
        }
      }
    }
  }
}