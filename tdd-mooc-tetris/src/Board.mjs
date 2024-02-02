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

    this.current.forEach(e => newBoard[e[0]][e[1]] = '.')

    for (let index = 0; index < this.current.length; index++) {
      const [i, j] = this.current[index]
      if (i+1 >= this.height || (this.board[i+1][j] !== '.' && !this.#arrayInC([i+1, j]))){
        this.falling = false
        return
      }

      newBoard[i+1][j] = this.board[i][j]
      this.current[index] = [i+1, j]
    }
    this.board = newBoard
  }

  hasFalling() {
    return this.falling
  }
  #arrayInC(i) {
    return this.current.some(e => JSON.stringify(e) === JSON.stringify(i))
  }
}

