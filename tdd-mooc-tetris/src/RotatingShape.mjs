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
        // newShape.push([this.#shape[0][2], this.#shape[1][2], this.#shape[2][2]])
        // newShape.push([this.#shape[0][1], this.#shape[1][1], this.#shape[2][1]])
        // newShape.push([this.#shape[0][0],this.#shape[1][0],this.#shape[2][0]])

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
        newShape.push([this.#shape[2][0], this.#shape[1][0], this.#shape[0][0]])
        newShape.push([this.#shape[2][1], this.#shape[1][1], this.#shape[0][1]])
        newShape.push([this.#shape[2][2],this.#shape[1][2],this.#shape[0][2]])
        return new RotatingShape(newShape.map(e => e.join('')).join('\n'))
    }
}