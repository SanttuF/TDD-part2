export class OldTetromino {
    static T_SHAPE = new OldTetromino('.T.\nTTT\n...')
    static I_SHAPE = new OldTetromino(`.....\n.....\nIIII.\n.....\n.....`)
    static O_SHAPE = new OldTetromino(`.OO\n.OO\n...`)
    
    constructor(shape, type='', orientation=1) {
        this.shape = shape.split('\n').map(e => e.trim().split(''))
        this.type = type
        this.orientation = orientation
    }

    toString() {
        return this.shape.map(e => e.join('')).join('\n') + '\n'
    }

    rotateRight() {
        if (this.#checkForCube()) {
            return new OldTetromino(this.toString().slice(0, -1))
        }
        const newShape = new Array(this.shape.length).fill(null).map(() => new Array(this.shape.length).fill('.'))
        for (let i = 0; i < newShape.length; i++) {
            for (let j = 0; j < newShape[0].length; j++) {
                newShape[i][j] = this.shape[this.shape.length - 1 -j][i]
            }
        }

        this.#alignI(newShape)
        return new OldTetromino(newShape.map(e => e.join('')).join('\n'))
    }

    rotateLeft() {
        if (this.#checkForCube()) {
            return new OldTetromino(this.toString().slice(0, -1))
        }
        const newShape = new Array(this.shape.length).fill(null).map(() => new Array(this.shape.length).fill('.'))
        for (let i = 0; i < newShape.length; i++) {
            for (let j = 0; j < newShape[0].length; j++) {
                newShape[i][j] = this.shape[j][this.shape.length - i - 1]
            }
        }

        this.#alignI(newShape)
        return new OldTetromino(newShape.map(e => e.join('')).join('\n'))
    }

    giveShape() {
        return this.shape
    }

    #alignI(newShape) {
        if (this.shape.length === 5) {
            if ((this.#checkRow(newShape, 0) ^ this.#checkRow(newShape, 4)) && !this.#checkRow(newShape, 0)) {
                newShape.shift()
                newShape.push(new Array(5).fill('.'))
            } else if ((this.#checkColumn(newShape, 0) ^ this.#checkColumn(newShape, 4)) && !this.#checkColumn(newShape, 0)) {
                this.#removeColumn(newShape)
                this.#addColumn(newShape)
            }
        }
    }

    #checkForCube() {
        return (this.shape.length === 3 && ((this.#checkColumn(this.shape, 0)^this.#checkColumn(this.shape,2)) && (this.#checkRow(this.shape,0)^this.#checkRow(this.shape,2))))
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


export class Tetromino {

    static T_SHAPE = new Tetromino(`....\nTTT.\n.T..\n....`, 'T')
    static I_SHAPE = new Tetromino(`....\nIIII\n....\n....`, 'I')
    static O_SHAPE = new Tetromino(`....\n.OO.\n.OO.\n....`, 'O')
    static L_SHAPE = new Tetromino(`....\nLLL.\nL...\n....`, 'L')
    static J_SHAPE = new Tetromino(`....\nJJJ.\n..J.\n....`, 'J')
    static S_SHAPE = new Tetromino(`....\n.SS.\nSS..\n....`, 'S')
    static Z_SHAPE = new Tetromino(`....\nZZ..\n.ZZ.\n....`, 'Z')

    tTypes = {
        'T': [`....\nTTT.\n.T..\n....`, `.T..\n.TT.\n.T..\n....`, `....\n.T..\nTTT.\n....`, `.T..\nTT..\n.T..\n....`],
        'I': [`....\nIIII\n....\n....`, `..I.\n..I.\n..I.\n..I.`, `....\nIIII\n....\n....`, `..I.\n..I.\n..I.\n..I.`],
        'O': [`....\n.OO.\n.OO.\n....`, `....\n.OO.\n.OO.\n....`, `....\n.OO.\n.OO.\n....`, `....\n.OO.\n.OO.\n....`],
        'L': [`....\nLLL.\nL...\n....`, `.L..\n.L..\n.LL.\n....`, `....\n..L.\nLLL.\n....`, `LL..\n.L..\n.L..\n....`],
        'J': [`....\nJJJ.\n..J.\n....`, `.JJ.\n.J..\n.J..\n....`, `....\nJ...\nJJJ.\n....`, `.J..\n.J..\nJJ..\n....`],
        'S': [`....\n.SS.\nSS..\n....`, `S...\nSS..\n.S..\n....`, `....\n.SS.\nSS..\n....`, `S...\nSS..\n.S..\n....`],
        'Z': [`....\nZZ..\n.ZZ.\n....`, `..Z.\n.ZZ.\n.Z..\n....`, `....\nZZ..\n.ZZ.\n....`, `..Z.\n.ZZ.\n.Z..\n....`]
    }

    constructor(shape, type, orientation=0) {
        this.shape = shape.split('\n').map(e => e.trim().split(''))
        this.type = type
        this.orientation = orientation
    }

    toString() {
        return this.shape.map(e => e.join('')).join('\n') + '\n'
    }

    rotateLeft() {
        const newOrientation = (this.orientation+1)%4
        return new Tetromino(this.tTypes[this.type][newOrientation], this.type, newOrientation)
    }

    rotateRight() {
        const newOrientation = (this.orientation+3)%4
        return new Tetromino(this.tTypes[this.type][newOrientation], this.type, newOrientation)
    }

    giveShape() {
        return this.shape
    }
}