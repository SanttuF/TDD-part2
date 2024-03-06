export const ScoringSystem = {
    score: 0,
    level: 0,
    multipliers: 
    {   1: 40,
        2: 100,
        3: 300,
        4: 1200 },
    removedRows: function(rowns) {
        this.score += this.multipliers[rowns] * (this.level + 1)
    }
}