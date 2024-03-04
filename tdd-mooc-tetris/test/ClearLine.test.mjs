import { beforeEach, describe, test } from "vitest";
import { Tetromino } from "../src/Tetromino.mjs";
import { Board } from "../src/Board.mjs";
import { expect } from "chai";

function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
      board.tick();
    }
}

describe('Line clear and block falling', () => {

    let board
    beforeEach(() => {
        board = new Board(10, 6)
    })

    test('Line clears when its full', () => {
        board.board = [
        ['.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.'],
        ['L','L','L','L','.','.','L','L','L','L'],
        ['L','L','L','L','.','.','L','L','L','L'],]

        board.drop(Tetromino.O_SHAPE)
        fallToBottom(board)
        expect(board.toString()).to.equalShape(
           `..........
            ..........
            ..........
            ..........
            ..........
            ..........`
        )
    })

    test('Blocks fall down after clear', () => {
        board.board = [
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['L','.','.','.','.','.','.','.','.','.'],
            ['L','L','L','L','.','.','L','L','L','L'],
            ['L','L','L','L','.','.','L','L','L','L'],]
        board.drop(Tetromino.O_SHAPE)
        fallToBottom(board)
        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ..........
            ..........
            ..........
            L.........`
        )
})
})