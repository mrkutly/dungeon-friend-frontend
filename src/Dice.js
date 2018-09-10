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
    const currentRoll = []

    for (let i = 0; i < 6; i++) {
      let acc = 0

      for (let k = 0; k < 4; k++) {
        let roll = Dice.d6()
        currentRoll.push(roll)
        acc += roll
      }
      acc = acc - Math.min(...currentRoll)
      rolls.push(acc)
    }
    return rolls
  }
}
