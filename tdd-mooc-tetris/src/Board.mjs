import { Tetromino, OldTetromino } from "./Tetromino.mjs";
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

    if (!(block instanceof OldTetromino || block instanceof Tetromino)) {
      block = new OldTetromino(block)
    }

    this.block = block
    this.blockLength = block.giveShape().length

    let startY = Math.ceil(this.width/2-1) - Math.floor(this.blockLength/2)
    let startX = 0
    if(block instanceof Tetromino) {startY += 1; startX -= 1}
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
    } else if (row < 0) {
      this.block = block
      this.pos[0] = row+1
    }
    this.placeBlock()
  }

  move(dir) {
    if (!this.falling) return
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
      this.placeBlock()
      if (dir === 'down') {
        this.falling = false
        this.checkLines()
      }
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
  checkLines() {
    let flag = false
    for(let i = this.height - 1; i >= 0; i--) {
      if (!(this.board[i].includes('.'))) {
        flag = true
        for (let j = 0; j < this.width; j++) {
          this.board[i][j] = '.'
        }
      }
    }
    if (flag) this.dropLines()
  }
  dropLines() {
    for(let i = this.height - 1; i >= 0; i--) {
      for (let j = 0; j < this.width; j++) {
        let x = i
        while(x+1 < this.height && this.board[x+1][j] === '.') {
          x += 1;};this.board[x][j] = this.board[i][j];this.board[i][j] = '.'}}this.checkLines()
  }
}