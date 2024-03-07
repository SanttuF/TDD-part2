import { beforeEach, describe, test } from "vitest";
import { Tetromino } from "../src/Tetromino.mjs";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { expect } from "chai";

describe('shuffle bag', () => {
    let bag
    beforeEach(() => {
        bag = new ShuffleBag()
    })

    test('bag contains tetrominoes', () => {
        expect(bag.giveNext() instanceof Tetromino).to.true
    })

    test('bag contains all tetrominoes', () => {
        const s = new Set()
        for (let i = 0; i < 20; i++) {
            const t = bag.giveNext()
            s.add(t.type)
        }
        expect(s.size).to.equal(7)
    })
})