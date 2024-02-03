export class Tetromino {
    static T_SHAPE = new Tetromino('.T.\nTTT\n...')
    
    constructor(shape) {
        this.shape = shape.split('\n').map(e => e.trim().split(''))
    }

    toString() {
        return this.shape.map(e => e.join('')).join('\n') + '\n'
    }
}