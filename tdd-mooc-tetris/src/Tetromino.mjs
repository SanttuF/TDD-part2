export class Tetromino {
    static T_SHAPE = new Tetromino('.T.\nTTT\n...')
    
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
    
}