import { Animal, Flower, GardenAnatomy, Tree } from './Garden'

export enum Enhancement {
  Lion = 1,
  Monkey,
  Peacock,
  DatePalm,
  Cedar,
  DragonTree,
  FlowerBR,
  FlowerBY,
  FlowerYR,
  FlowerBB,
  FlowerYY,
  FlowerRR,
  LionCrown,
  MonkeyCrown,
  CedarGold,
  CedarTools,
  FlowerBRTools,
  FlowerBYTools,
  FlowerYRTools,
  FlowerBYRCrown,
  MonkeyIrrigation,
  PeacockIrrigation,
  DatePalmIrrigation,
  DragonTreeIrrigation,
  FlowerBYRIrrigation
}

export enum EnhancementType {
  Simple = 1,
  Bonus,
  Irrigation
}

export function getEnhancementType(enhancement: Enhancement) {
  if (enhancement < Enhancement.LionCrown) {
    return EnhancementType.Simple
  } else if (enhancement < Enhancement.MonkeyIrrigation) {
    return EnhancementType.Bonus
  } else {
    return EnhancementType.Irrigation
  }
}

export type EnhancementId = {
  front?: Enhancement
  back: EnhancementType
}

export const enhancementsAnatomy: Record<Enhancement, GardenAnatomy> = {
  [Enhancement.Lion]: { main: Animal.Lion, animalScoring: [3, 2, 2] },
  [Enhancement.Monkey]: { main: Animal.Monkey, animalScoring: [2, 3, 2] },
  [Enhancement.Peacock]: { main: Animal.Peacock, animalScoring: [2, 2, 3] },
  [Enhancement.DatePalm]: { main: Tree.DatePalm },
  [Enhancement.Cedar]: { main: Tree.Cedar },
  [Enhancement.DragonTree]: { main: Tree.DragonTree },
  [Enhancement.FlowerBR]: { flowers: [Flower.Blue, Flower.Red] },
  [Enhancement.FlowerBY]: { flowers: [Flower.Blue, Flower.Yellow] },
  [Enhancement.FlowerYR]: { flowers: [Flower.Yellow, Flower.Red] },
  [Enhancement.FlowerBB]: { flowers: [Flower.Blue, Flower.Blue] },
  [Enhancement.FlowerYY]: { flowers: [Flower.Yellow, Flower.Yellow] },
  [Enhancement.FlowerRR]: { flowers: [Flower.Red, Flower.Red] },
  [Enhancement.LionCrown]: { main: Animal.Lion, crown: true, animalScoring: [3, 2, 2] },
  [Enhancement.MonkeyCrown]: { main: Animal.Monkey, crown: true, animalScoring: [2, 3, 2] },
  [Enhancement.CedarGold]: { main: Tree.Cedar, gold: true },
  [Enhancement.CedarTools]: { main: Tree.Cedar, tools: true },
  [Enhancement.FlowerBRTools]: { flowers: [Flower.Blue, Flower.Red], tools: true },
  [Enhancement.FlowerBYTools]: { flowers: [Flower.Blue, Flower.Yellow], tools: true },
  [Enhancement.FlowerYRTools]: { flowers: [Flower.Yellow, Flower.Red], tools: true },
  [Enhancement.FlowerBYRCrown]: { flowers: [Flower.Blue, Flower.Yellow, Flower.Red], crown: true },
  [Enhancement.MonkeyIrrigation]: { main: Animal.Monkey, irrigation: true, animalScoring: [2, 4, 2] },
  [Enhancement.PeacockIrrigation]: { main: Animal.Peacock, irrigation: true, animalScoring: [2, 2, 4] },
  [Enhancement.DatePalmIrrigation]: { main: Tree.DatePalm, irrigation: true },
  [Enhancement.DragonTreeIrrigation]: { main: Tree.DragonTree, irrigation: true },
  [Enhancement.FlowerBYRIrrigation]: { flowers: [Flower.Blue, Flower.Yellow, Flower.Red], irrigation: true }
}
