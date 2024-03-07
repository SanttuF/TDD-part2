import { Tetromino } from "./Tetromino.mjs";

export class ShuffleBag {
    constructor(filling = undefined) {
        this.bag = []
        this.filling = filling
    }

    giveNext() {
        if (this.bag.length === 0) this.refill()
        return this.bag.pop()
    }

    refill() {
        if (this.filling) this.bag = this.filling.slice()
        this.bag = this.shuffle([
            Tetromino.I_SHAPE, Tetromino.I_SHAPE, 
            Tetromino.J_SHAPE, Tetromino.J_SHAPE, 
            Tetromino.L_SHAPE, Tetromino.L_SHAPE, 
            Tetromino.O_SHAPE, Tetromino.O_SHAPE, 
            Tetromino.S_SHAPE, Tetromino.S_SHAPE, 
            Tetromino.T_SHAPE, Tetromino.T_SHAPE, 
            Tetromino.Z_SHAPE, Tetromino.Z_SHAPE])
    }

    shuffle(arr) {
        let m = arr.length, t, i;
      
        while (m) {
      
          i = Math.floor(Math.random() * m--);
      
          t = arr[m];
          arr[m] = arr[i];
          arr[i] = t;
        }
      
        return arr;
      }
}