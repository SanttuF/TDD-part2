export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(this.height).fill(null).map(() => new Array(this.width).fill('.'))
    this.falling = false
    this.c = []
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
    this.c = []

    for (let i = 0; i < aBlock.length; i++) {
      for (let j = 0; j < aBlock[0].length; j++) {
        this.board[i][j + blockOffset] = aBlock[i][j]
        this.c.push([i, j + blockOffset])
      }
    }
    this.falling = true
  }

  tick() {
    const newBoard = this.board
    this.c.forEach((e, index) => {
      const [i, j] = e
      if (i+1 >= this.height || (this.board[i+1][j] !== '.' )){
        this.falling = false
        return
      }

      newBoard[i+1][j] = this.board[i][j]
      newBoard[i][j] = '.'
      this.c[index] = [i+1, j]
    })
    this.board = newBoard
  }

  hasFalling() {
    return this.falling
  }
  #arrayInC(i) {
    return this.c.some(e => JSON.stringify(e) === JSON.stringify(i))
  }
}

