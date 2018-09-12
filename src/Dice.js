export const Dice = {
  d20: () => Math.floor(Math.random() * 19) + 1,
  d12: () => Math.floor(Math.random() * 11) + 1,
  d10: () => Math.floor(Math.random() * 9) + 1,
  d8: () => Math.floor(Math.random() * 7) + 1,
  d6: () => Math.floor(Math.random() * 5) + 1,
  d4: () => Math.floor(Math.random() * 3) + 1,
  percentile: () => Math.floor(Math.random() * 9) * 10,

  rollStats: () => {
    const rolls = []

    for (let i = 0; i < 6; i++) {
      rolls.push(Math.floor(Math.random() * 15) + 3)
    }

    return rolls
  }
}
