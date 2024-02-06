export class Tetromino {
    static T_SHAPE = new this('.T.\nTTT\n...')
    static I_SHAPE = new this(`.....\n.....\nIIII.\n.....\n.....`)
    static O_SHAPE = new this(`.OO\n.OO\n...`)
    
    constructor(shape) {
        this.shape = shape.split('\n').map(e => e.trim().split(''))
    }

    toString() {
        return this.shape.map(e => e.join('')).join('\n') + '\n'
    }

    rotateRight() {
        const newShape = []
        for (let i = 0; i < this.shape.length; i++) {
            newShape.push([])
            for (let j = 0; j < this.shape.length; j++) {
                newShape[i].push(this.shape[this.shape.length - 1 -j][i])
            }
        }
        return new Tetromino(newShape.map(e => e.join('')).join('\n'))
    }

    rotateLeft() {
        const newShape = []
        for (let i = 0; i < this.shape.length; i++) {
            newShape.push([])
            for (let j = 0; j < this.shape.length; j++) {
                newShape[i].push(this.shape[j][this.shape.length - i - 1])
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
}