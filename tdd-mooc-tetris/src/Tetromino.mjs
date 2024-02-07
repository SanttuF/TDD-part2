export class Tetromino {
    static T_SHAPE = new Tetromino('.T.\nTTT\n...')
    static I_SHAPE = new Tetromino(`.....\n.....\nIIII.\n.....\n.....`)
    static O_SHAPE = new Tetromino(`.OO\n.OO\n...`)
    
    constructor(shape) {
        this.shape = shape.split('\n').map(e => e.trim().split(''))
    }

    toString() {
        return this.shape.map(e => e.join('')).join('\n') + '\n'
    }

    rotateRight() {
        const newShape = new Array(this.shape.length).fill(null).map(() => new Array(this.shape.length).fill('.'))
        for (let i = 0; i < newShape.length; i++) {
            for (let j = 0; j < newShape[0].length; j++) {
                newShape[i][j] = this.shape[this.shape.length - 1 -j][i]
            }
        }
        return new Tetromino(newShape.map(e => e.join('')).join('\n'))
    }

    rotateLeft() {
        const newShape = new Array(this.shape.length).fill(null).map(() => new Array(this.shape.length).fill('.'))
        for (let i = 0; i < newShape.length; i++) {
            for (let j = 0; j < newShape[0].length; j++) {
                newShape[i][j] = this.shape[j][this.shape.length - i - 1]
            }
        }
        return new Tetromino(newShape.map(e => e.join('')).join('\n'))
    }

    #checkRow(i) {
        for (let x = 0; x < this.shape[i].length; x++) {
            if (this.shape[i][x] !== '.') {
                return true
            }
        }
        return false
    }

    #checkColumn(i) {
        for (let x = 0; x < this.shape.length; x++) {
            if (this.shape[x][i] !== '.') {
                return true
            }
        }
        return false
    }

    #removeColumn(i, s) {
        for (let x = 0; x < s.length; x++) {
            s[x].pop(i)
        }
    }

    #addColumn(s, f) {
        if (f) {
            for (let x = 0; x < s.length; x++) {
                s[x.push('.')]
            }
        } else {
            for (let x = 0; x < s.length; x++) {
                s[x.unshift('.')]
            }
        }
    }
}