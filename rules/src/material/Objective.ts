export enum Objective {
  Irrigation = 1,
  BlueFlowers,
  YellowFlowers,
  RedFlowers,
  Animals,
  Trees,
  Visitors,
  Crowns,
  GoldBonus,
  ToolsBonus
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
