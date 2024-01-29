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

    for (let i = 0; i < aBlock.length; i++) {
      for (let j = 0; j < aBlock[0].length; j++) {
        this.board[i][j + blockOffset] = aBlock[i][j]
      }
    }

    this.c = [0, Math.floor(this.width/2), block]
    this.falling = true
  }

  tick() {
    const [i, j, b] = this.c
    if (i+1 >= this.height || this.board[i+1][j] !== '.'){
      this.falling = false
      return
    }

    this.board[i+1][j] = b
    this.board[i][j] = '.'
    this.c[0] += 1
  }

  hasFalling() {
    return this.falling
  }
}
