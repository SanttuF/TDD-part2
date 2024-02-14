export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(this.height).fill(null).map(() => new Array(this.width).fill('.'))
    this.falling = false
    this.current = []
  }

  toString() {
    let s = ''
    this.board.forEach(e => s += e.join('') + '\n')
    return s
  }

  drop(block) {
    if (this.falling) throw new Error('already falling')

    if (typeof block !== 'string') {
      block = block.toString().slice(0, -1)
    }

    const aBlock = block.split('\n')
    const boardCenter = Math.floor(this.board.length/2) + 1
    const blockOffset = boardCenter - Math.floor(block[0].length)

    this.current = []

    for (let i = 0; i < aBlock.length; i++) {
      for (let j = 0; j < aBlock[0].length; j++) {
        this.board[i][j + blockOffset] = aBlock[i][j]
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
    // this.#move('left')
    // return
    const newBoard = this.board.map(a => a.slice())
    this.current.forEach(e => newBoard[e[0]][e[1]] = '.')
    const newCurrent = this.current.map(a => a.slice())

    for(let index = 0; index < this.current.length; index++) {
      const [i, j] = this.current[index]
      if (this.#checkCollision(i, j-1)) return
    
      newCurrent[index] = [i, j-1]
      newBoard[i][j-1] = this.board[i][j]
    }
    this.current = newCurrent
    this.board = newBoard
  }

  #move(dir) {
    const newBoard = this.board.map(a => a.slice())
    this.current.forEach(e => newBoard[e[0]][e[1]] = '.')
    const newCurrent = this.current.map(a => a.slice())

    for(let index = 0; index < this.current.length; index++) {
      const [i, j] = this.current[index]
      let [newJ, newI] = this.current[index]
      switch (dir) {
        case 'left': newJ -= 1; break
        case 'right': newJ += 1; break
        case 'down': newI += 1; break
      }
      if (this.#checkCollision(newI, newJ)) return
    
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
}

