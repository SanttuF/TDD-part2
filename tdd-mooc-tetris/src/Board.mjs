export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(this.height).fill(null).map(() => new Array(this.width).fill('.'))
    this.falling = false
  }

  toString() {
    let s = ''
    this.board.forEach(e => s += e.join('') + '\n')
    return s
  }

  drop(block) {
    if (this.falling) throw new Error('already falling')

    this.board[0][Math.floor(this.width/2)] = block
    this.falling = true
  }

  tick() {
    const newBoard = new Array(this.height).fill(null).map(() => new Array(this.width).fill('.'))
    for (let i = this.height-1; i >= 0; i--) {
      for (let j = this.width-1; j >= 0; j--) {
        
        const current = this.board[i][j]
        if (current !== '.') {

          if (i === this.height-1) {
            this.falling = false
            return
          }

          this.board[i+1][j] = current
          this.board[i][j] = '.'
        }
      }
    }
  }

  hasFalling() {
    return this.falling
  }
}
