import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { expect } from "chai";

describe('Falling tetriminoe rotation', () => {
    let board
    beforeEach(() => {
        board = new Board(10, 6)
    })

    test('Falling tetriminoes can be rotated clockwise', () => {
        board.drop(Tetromino.T_SHAPE)
        board.rotateRight()

        expect(board.toString()).to.equalShape(
           `....T.....
            ...TT.....
            ....T.....
            ..........
            ..........
            ..........`
        )
    })

    test('Falling tetriminoes can be rotated counter-clockwise', () => {
        board.drop(Tetromino.T_SHAPE)
        board.rotateLeft()

        expect(board.toString()).to.equalShape(
           `....T.....
            ....TT....
            ....T.....
            ..........
            ..........
            ..........`
        )
    })

    test('Cant be rotated if no space', () => {
        board.drop(Tetromino.T_SHAPE)
        board.rotateLeft()
        board.rotateLeft()
        board.moveLeft()
        board.moveLeft() 
        board.moveLeft()      
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.drop(Tetromino.T_SHAPE)
        board.rotateLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.tick()
        board.tick()
        board.rotateLeft()

        expect(board.toString()).to.equalShape(
           `..........
            ..........
            T.........
            TT........
            TT........
            TTT.......`
        )
    })

    test('Wallbounce', () => {
        board.drop(Tetromino.T_SHAPE)
        board.moveDown()
        board.rotateRight()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.rotateLeft()

        expect(board.toString()).to.equalShape(
            `..........
             TTT.......
             .T........
             ..........
             ..........
             ..........`
         )
    })
})