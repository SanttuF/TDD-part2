import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { expect } from "chai";
import { ScoringSystem } from "../src/Scoring.mjs";

describe('Scoring system', () => {
    let board
    let score
    beforeEach(()=> {
        score = ScoringSystem
        board = new Board(4,3, score)
    })

    test('score increases', () => {
        board.drop(Tetromino.I_SHAPE)
        board.tick()
        board.tick()
        board.tick()

        expect(score.score).to.equal(40)
    })
})