export class RotatingShape {
    #shape

    constructor(shape) {
        this.#shape = shape.split('\n').map(e => e.trim().split(''))
    }

    toString() {
        return this.#shape.map(e => e.join('')).join('\n') + '\n'
    }

    rotateLeft() {
        const newShape = []
        for (let i = 0; i < this.#shape.length; i++) {
            newShape.push([])
            for (let j = 0; j < this.#shape.length; j++) {
                newShape[i].push(this.#shape[j][this.#shape.length - i - 1])
            }
        }
        return new RotatingShape(newShape.map(e => e.join('')).join('\n'))
    }

    rotateRight() {
        const newShape = []
        for (let i = 0; i < this.#shape.length; i++) {
            newShape.push([])
            for (let j = 0; j < this.#shape.length; j++) {
                newShape[i].push(this.#shape[this.#shape.length - 1 -j][i])
            }
        }
        return new RotatingShape(newShape.map(e => e.join('')).join('\n'))
    }
}