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
        if (this.shape.length === 5) {
            if ((this.#checkRow(newShape, 0) ^ this.#checkRow(newShape, 4)) && !this.#checkRow(newShape, 0)) {
                newShape.shift()
                newShape.push(new Array(5).fill('.'))
            } else if ((this.#checkColumn(newShape, 0) ^ this.#checkColumn(newShape, 4)) && !this.#checkColumn(newShape, 0)) {
                this.#removeColumn(newShape, 0)
                this.#addColumn(newShape, )
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
        if (this.shape.length === 5) {
            if ((this.#checkRow(newShape, 0) ^ this.#checkRow(newShape, 4)) && !this.#checkRow(newShape, 0)) {
                newShape.shift()
                newShape.push(new Array(5).fill('.'))
            } else if ((this.#checkColumn(newShape, 0) ^ this.#checkColumn(newShape, 4)) && !this.#checkColumn(newShape, 0)) {
                this.#removeColumn(newShape)
                this.#addColumn(newShape)
            }
        }
        return new Tetromino(newShape.map(e => e.join('')).join('\n'))
    }

    #checkRow(shape, i) {
        for (let x = 0; x < shape[i].length; x++) {
            if (shape[i][x] !== '.') {
                return true
            }
        }
        return false
    }

    #checkColumn(shape, i) {
        for (let x = 0; x < shape.length; x++) {
            if (shape[x][i] !== '.') {
                return true
            }
        }
        return false
    }

    #removeColumn(s) {
        for (let x = 0; x < s.length; x++) {
            s[x].shift()
        }
    }

    #addColumn(s) {
        for (let x = 0; x < s.length; x++) {
            s[x].push('.')
        }
    }
}