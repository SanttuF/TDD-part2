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
            ....TT....
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
            ...TT.....
            ....T.....
            ..........
            ..........
            ..........`
        )
    })
})