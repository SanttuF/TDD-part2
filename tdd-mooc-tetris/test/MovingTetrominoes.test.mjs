import { expect } from "chai";
import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe('Test moving', () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6)
    })

    test('can move left', () => {
        board.drop(Tetromino.T_SHAPE)
        board.moveLeft()

        expect(board.toString()).to.equalShape(
           `...T......
            ..TTT.....
            ..........
            ..........
            ..........
            ..........`
        )
    })

    test('can move right', () => {
        board.drop(Tetromino.T_SHAPE)
        board.moveRight()

        expect(board.toString()).to.equalShape(
           `.....T....
            ....TTT...
            ..........
            ..........
            ..........
            ..........`
        )
    })

    test('can move down', () => {
        board.drop(Tetromino.T_SHAPE)
        board.moveDown()

        expect(board.toString()).to.equalShape(
           `..........
            ....T.....
            ...TTT....
            ..........
            ..........
            ..........`
        )
    })

    test('cannot move out left', () => {
        board.drop(Tetromino.T_SHAPE)
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()

        expect(board.toString()).to.equalShape(
            `.T........
             TTT.......
             ..........
             ..........
             ..........
             ..........`
         )
    })

    test('cannot move out right', () => {
        board.drop(Tetromino.T_SHAPE)
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()

        expect(board.toString()).to.equalShape(
            `........T.
             .......TTT
             ..........
             ..........
             ..........
             ..........`
         )
    })
    
}) 