import { expect } from "chai";
import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino, NewTetromino } from "../src/Tetromino.mjs";

describe('Test moving', () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6)
    })

    test('can move left', () => {
        board.drop(NewTetromino.T_SHAPE)
        board.moveLeft()

        expect(board.toString()).to.equalShape(
           `..TTT.....
            ...T......
            ..........
            ..........
            ..........
            ..........`
        )
    })

    test('can move right', () => {
        board.drop(NewTetromino.T_SHAPE)
        board.moveRight()

        expect(board.toString()).to.equalShape(
           `....TTT...
            .....T....
            ..........
            ..........
            ..........
            ..........`
        )
    })

    test('can move down', () => {
        board.drop(NewTetromino.T_SHAPE)
        board.moveDown()

        expect(board.toString()).to.equalShape(
           `..........
            ...TTT....
            ....T.....
            ..........
            ..........
            ..........`
        )
    })

    test('cannot move out left', () => {
        board.drop(NewTetromino.T_SHAPE)
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()

        expect(board.toString()).to.equalShape(
            `TTT.......
             .T........
             ..........
             ..........
             ..........
             ..........`
         )
    })

    test('cannot move out right', () => {
        board.drop(NewTetromino.T_SHAPE)
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()

        expect(board.toString()).to.equalShape(
            `.......TTT
             ........T.
             ..........
             ..........
             ..........
             ..........`
         )
    })

    test('cannot move out down', () => {
        board.drop(NewTetromino.T_SHAPE)
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ..........
             ...TTT....
             ....T.....`
         )
        expect(board.hasFalling()).to.equal(false)
    })

    test('cannot move through block left', () => {
        board.drop(NewTetromino.T_SHAPE)
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        while (board.hasFalling()) {
            board.moveDown()
        }
        board.drop(NewTetromino.T_SHAPE)
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ..TTT.....
             TTTT......
             .T........`
         )
    })

    test('cannot move through block right', () => {
        board.drop(NewTetromino.T_SHAPE)
        board.moveRight()
        board.moveRight()
        board.moveRight()
        while (board.hasFalling()) {
            board.moveDown()
        }
        board.drop(NewTetromino.T_SHAPE)
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ....TTT...
             .....TTTT.
             .......T..`
         )
    })

    test('cannot move through block down', () => {
        board.drop(NewTetromino.T_SHAPE)
        while (board.hasFalling()) {
            board.moveDown()
        }
        board.drop(NewTetromino.T_SHAPE)
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ...TTT....
             ....T.....
             ...TTT....
             ....T.....`
        )
        expect(board.hasFalling()).to.equal(false)
    })
})