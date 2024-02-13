import { expect } from "chai";
import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";

describe('Test moving', () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6)
    })

    test('can move left', () => {
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
}) 