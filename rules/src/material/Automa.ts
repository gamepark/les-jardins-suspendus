export enum Automa {
  Automa1 = 1,
  Automa2,
  Automa3,
  Automa4,
  Automa5,
  Automa6,
  Automa7,
  Automa8,
  Automa9,
  Automa10,
  Automa11,
  Automa12,
  Automa13,
  Automa14,
  Automa15,
  Automa16,
  Automa17,
  Automa18
}

export enum SoloDifficulty {
  Easy = 1,
  Medium,
  Advanced,
  Expert
}

export const getSoloGold = (difficulty = SoloDifficulty.Easy) => 4 - difficulty
export const getSoloTools = (difficulty = SoloDifficulty.Easy) => 5 - difficulty

export type AutomaAnatomy = {
  columns: number[]
  discard: AutomaDiscard
  discardFallback?: number
  bonusAction: AutomaBonusAction
}

export enum AutomaDiscard {
  Animal = 1,
  Tree,
  Visitor,
  Irrigation,
  Flowers
}

export enum AutomaBonusAction {
  Enhancement2 = 1,
  Enhancement3,
  Enhancement4,
  FirstPlayer,
  Objective
}

export const automasAnatomy: Record<Automa, AutomaAnatomy> = {
  [Automa.Automa1]: {
    columns: [1, 2, 3],
    discard: AutomaDiscard.Animal,
    discardFallback: 1,
    bonusAction: AutomaBonusAction.FirstPlayer
  },
  [Automa.Automa2]: {
    columns: [1, 3, 2],
    discard: AutomaDiscard.Tree,
    discardFallback: 3,
    bonusAction: AutomaBonusAction.Objective
  },
  [Automa.Automa3]: {
    columns: [2, 1, 3],
    discard: AutomaDiscard.Visitor,
    discardFallback: 3,
    bonusAction: AutomaBonusAction.Objective
  },
  [Automa.Automa4]: {
    columns: [2, 3, 1],
    discard: AutomaDiscard.Irrigation,
    discardFallback: 4,
    bonusAction: AutomaBonusAction.Enhancement4
  },
  [Automa.Automa5]: {
    columns: [3, 1, 2],
    discard: AutomaDiscard.Tree,
    discardFallback: 1,
    bonusAction: AutomaBonusAction.FirstPlayer
  },
  [Automa.Automa6]: {
    columns: [3, 2, 1],
    discard: AutomaDiscard.Visitor,
    discardFallback: 2,
    bonusAction: AutomaBonusAction.FirstPlayer
  },
  [Automa.Automa7]: {
    columns: [1, 2, 3],
    discard: AutomaDiscard.Irrigation,
    discardFallback: 3,
    bonusAction: AutomaBonusAction.Objective
  },
  [Automa.Automa8]: {
    columns: [1, 3, 2],
    discard: AutomaDiscard.Animal,
    discardFallback: 4,
    bonusAction: AutomaBonusAction.FirstPlayer
  },
  [Automa.Automa9]: {
    columns: [2, 1, 3],
    discard: AutomaDiscard.Visitor,
    discardFallback: 1,
    bonusAction: AutomaBonusAction.Enhancement2
  },
  [Automa.Automa10]: {
    columns: [2, 3, 1],
    discard: AutomaDiscard.Irrigation,
    discardFallback: 2,
    bonusAction: AutomaBonusAction.Enhancement3
  },
  [Automa.Automa11]: {
    columns: [3, 1, 2],
    discard: AutomaDiscard.Animal,
    discardFallback: 2,
    bonusAction: AutomaBonusAction.Objective
  },
  [Automa.Automa12]: {
    columns: [3, 2, 1],
    discard: AutomaDiscard.Tree,
    discardFallback: 4,
    bonusAction: AutomaBonusAction.Enhancement2
  },
  [Automa.Automa13]: {
    columns: [1, 2, 3],
    discard: AutomaDiscard.Visitor,
    discardFallback: 4,
    bonusAction: AutomaBonusAction.Enhancement2
  },
  [Automa.Automa14]: {
    columns: [1, 3, 2],
    discard: AutomaDiscard.Flowers,
    bonusAction: AutomaBonusAction.FirstPlayer
  },
  [Automa.Automa15]: {
    columns: [2, 1, 3],
    discard: AutomaDiscard.Animal,
    discardFallback: 3,
    bonusAction: AutomaBonusAction.FirstPlayer
  },
  [Automa.Automa16]: {
    columns: [2, 3, 1],
    discard: AutomaDiscard.Tree,
    discardFallback: 2,
    bonusAction: AutomaBonusAction.Objective
  },
  [Automa.Automa17]: {
    columns: [3, 1, 2],
    discard: AutomaDiscard.Flowers,
    bonusAction: AutomaBonusAction.Enhancement3
  },
  [Automa.Automa18]: {
    columns: [3, 2, 1],
    discard: AutomaDiscard.Irrigation,
    discardFallback: 1,
    bonusAction: AutomaBonusAction.Objective
  }
}
