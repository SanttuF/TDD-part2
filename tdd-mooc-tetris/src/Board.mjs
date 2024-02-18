import { Tetromino } from "./Tetromino.mjs";
export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(this.height).fill(null).map(() => new Array(this.width).fill('.'))
    this.falling = false
    this.current = []
    this.block
  }

  toString() {
    let s = ''
    this.board.forEach(e => s += e.join('') + '\n')
    return s
  }

  drop(block) {
    if (this.falling) throw new Error('already falling')

    if (typeof block !== 'string') {
      this.block = block
      block = block.toString().slice(0, -1)
    } else {this.block = new Tetromino(block)}

    const aBlock = block.split('\n')
    const boardCenter = Math.floor(this.board.length/2) + 1
    const blockOffset = boardCenter - Math.floor(block[0].length)
    const pos = Math.floor((this.width - this.block.toString().split('\n')[0].length) / 2)

    this.current = []

    this.#drawBlock(0, pos)
    for (let i = 0; i < aBlock.length; i++) {
      for (let j = 0; j < aBlock[0].length; j++) {
        if (aBlock[i][j] !== '.') {
          this.current.push([i, j + blockOffset])
        }
      }
    }

    this.falling = true
  }

  tick() {
    const newBoard = this.board.map(a => a.slice())
    const newCurrent = this.current.map(a => a.slice())

    this.current.forEach(e => newBoard[e[0]][e[1]] = '.')

    for (let index = 0; index < this.current.length; index++) {
      const [i, j] = this.current[index]
      if (this.#checkCollision(i+1, j)){
        this.falling = false
        return
      }

      newBoard[i+1][j] = this.board[i][j]
      newCurrent[index] = [i+1, j]
    }
    this.current = newCurrent
    this.board = newBoard
  }

  hasFalling() {
    return this.falling
  }

  moveLeft() {
    this.#move('left')
  }
  
  moveRight() {
    this.#move('right')
  }

  moveDown() {
    this.#move('down')
  }

  #move(dir) {
    // let [i, j] = this.current.slice()
    // this.eraseBlock(i, j)
    
    const newBoard = this.board.map(a => a.slice())
    this.current.forEach(e => newBoard[e[0]][e[1]] = '.')
    const newCurrent = this.current.map(a => a.slice())

    for(let index = 0; index < this.current.length; index++) {
      const [i, j] = this.current[index]
      let [newI, newJ] = this.current[index].slice()
      switch (dir) {
        case 'left': newJ -= 1; break
        case 'right': newJ += 1; break
        case 'down': newI += 1; break
        default: throw new Error('Invalid direction')
      }
      if (this.#checkCollision(newI, newJ)){
        if(dir === 'down') {
          this.falling = false
        }
        return
      }
      newCurrent[index] = [newI, newJ]
      newBoard[newI][newJ] = this.board[i][j]
    }
    this.current = newCurrent
    this.board = newBoard
  }

  #arrayInC(i) {
    return this.current.some(e => JSON.stringify(e) === JSON.stringify(i))
  }

  #checkCollision(i, j) {
    if (i >= this.height) return true
    if (this.board[i][j] !== '.' && !this.#arrayInC([i, j])) return true
  }

  #eraseBlock(i, j) {
    const block = this.block.toString().split('\n').map(e => e.trim())
    const l = block[0].length
    for (let x = 0; x < l; x++) {
      for (let y = 0; y < l; y++)
      {
        this.board[i+x][j+y] = '.'
      }
    }
  }

  #drawBlock(i, j) {
    const block = this.block.toString().split('\n').map(e => e.trim())
    const l = block[0].length
    for (let x = 0; x < l; x++) {
      for (let y = 0; y < l; y++)
      {
        if ((i+x >= 0 || j+y >= 0 || i+x < this.width || j+y < this.width) && block[x][y] !== '.') {
          this.board[i+x][j+y] = block[x][y]
        }
      }
    }
  }
}

