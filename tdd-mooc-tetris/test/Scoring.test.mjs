import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { expect } from "chai";
import { ScoringSystem } from "../src/Scoring.mjs";

describe('Scoring system', () => {
    let board
    let score = ScoringSystem
    beforeEach(()=> {
        score.score = 0
        score.level = 0
        board = new Board(4,4, score)
    })

    test('score increases', () => {
        board.drop(Tetromino.I_SHAPE)
        board.tick()
        board.tick()
        board.tick()
        board.tick()

        expect(score.score).to.equal(40)
    })

    test('score increases based on rows cleared', () => {
        board.drop(Tetromino.O_SHAPE)
        board.moveLeft()
        board.tick()
        board.tick()
        board.tick()

        board.drop(Tetromino.O_SHAPE)
        board.moveRight()
        board.tick()
        board.tick()
        board.tick()

        expect(score.score).to.equal(100)
    })

    test('score increases based on level', () => {
        score.level = 2
        board.drop(Tetromino.I_SHAPE)
        board.tick()
        board.tick()
        board.tick()
        board.tick()

        expect(score.score).to.equal(120)
    })
})