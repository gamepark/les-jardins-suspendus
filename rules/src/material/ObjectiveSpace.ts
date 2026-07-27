export enum ObjectiveSpace {
  Score5Or3 = 1,
  Score4Or2,
  ToolScore2Or1,
  GoldScore2Or1
}

export function getObjectiveSpacePlaces(playersCount: number) {
  return playersCount > 3 ? 4 : 2
}
