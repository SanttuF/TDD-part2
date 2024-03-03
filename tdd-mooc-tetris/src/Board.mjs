import { NewTetromino, Tetromino } from "./Tetromino.mjs";
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

    if (!(block instanceof Tetromino || block instanceof NewTetromino)) {
      block = new Tetromino(block)
    }

    this.block = block
    this.blockLength = block.giveShape().length

    let startY = Math.ceil(this.width/2-1) - Math.floor(this.blockLength/2)
    let startX = 0
    if(block instanceof NewTetromino) {startY += 1; startX -= 1}
    this.pos = [startX, startY]
    
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
    this.move('down')
  }

  moveLeft() {
    this.move('left')
  }

  moveRight() {
    this.move('right')
  }

  rotateRight() {
    this.rotate(this.block.rotateRight())
  }

  rotateLeft() {
    this.rotate(this.block.rotateLeft())
  }

  rotate(block) {
    const [row, col] = this.pos
    this.eraseBlock()
    if (!this.checkCollision(row, col, block.giveShape())) {
      this.block = block
    } else if (!this.checkCollision(row, col-1, block.giveShape())) {
      this.block = block
      this.pos[1] = col-1
    } else if (!this.checkCollision(row, col+1, block.giveShape())) {
      this.block = block
      this.pos[1] = col+1
    } else if (!this.checkCollision(row+1, col, block.giveShape())) {
      this.block = block
      this.pos[0] = row+1
    }
    this.placeBlock()
  }

  move(dir) {
    let [row, col] = this.pos
    this.eraseBlock()

    switch (dir) {
      case 'down':
        row += 1
        break

      case 'left':
        col -= 1
        break

      case 'right':
        col += 1
        break

      default:
        throw new Error('not valid direction')
    }

    if(this.checkCollision(row, col)) {
      if (dir === 'down') this.falling = false
      this.placeBlock()
      return
    }

    this.pos = [row, col]
    this.placeBlock()
  }

  checkCollision(row, col, block = this.block.giveShape()) {
    for (let i = 0; i < this.blockLength; i++) {
      for (let j = 0; j < this.blockLength; j++) {
        if (block[i][j] === '.') continue
        if (row + i >= this.height || row + i < 0 || this.board[row+i][col+j] !== '.') {
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