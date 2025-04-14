export enum Objective {
  Animals = 1,
  Trees,
  Irrigation,
  Visitors,
  GoldBonus,
  ToolsBonus,
  Crowns,
  BlueFlowers,
  YellowFlowers,
  RedFlowers
}

export function getObjectiveRequiredAmount(objective: Objective) {
  switch (objective) {
    case Objective.BlueFlowers:
    case Objective.YellowFlowers:
    case Objective.RedFlowers:
      return 4
    default:
      return 3
  }
}
