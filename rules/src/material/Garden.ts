import { getEnumValues } from '@gamepark/rules-api'

export enum Garden {
  LionIrrigation = 1, // x2
  Lion,
  MonkeyIrrigation, // x2
  MonkeyBY,
  MonkeyRY,
  MonkeyBR,
  Monkey,
  PeacockIrrigation, // x2
  PeacockCrown,
  PeacockGold,
  PeacockTools,
  Peacock,
  DatePalm, // x6
  CedarIrrigation, // x2
  CedarCrown,
  CedarTools,
  CedarGold,
  DragonTreeIrrigation,
  DragonTreeB,
  DragonTreeR,
  DragonTreeY,
  EmptyBRY,
  EmptyBRCrown,
  EmptyBYCrown,
  EmptyYRCrown,
  EmptyBRTools,
  EmptyBYTools,
  EmptyYRTools,
  EmptyBRGold,
  EmptyBYGold,
  EmptyYRGold,
  EmptyBBGold,
  EmptyRRGold,
  EmptyYYGold,
  EmptyBBTools,
  EmptyRRTools,
  EmptyYYTools,
  EmptyBRIrrigation,
  EmptyBYIrrigation,
  EmptyRYIrrigation,
  EmptyBIrrigationCrown,
  EmptyRIrrigationCrown,
  EmptyYIrrigationCrown,
  EmptyBIrrigationGold,
  EmptyRIrrigationGold,
  EmptyYIrrigationGold,
  EmptyBIrrigationTools,
  EmptyRIrrigationTools,
  EmptyYIrrigationTools,
  EmptyBCrownGold,
  EmptyRCrownGold,
  EmptyYCrownGold,
  VisitorBlueFlowersIrrigation,
  VisitorYellowFlowersIrrigation,
  VisitorRedFlowersIrrigation,
  VisitorIrrigation,
  VisitorCrowns,
  VisitorFlowers,
  VisitorVisitorsIrrigation,
  VisitorObjectivesCrown,
  VisitorAnimalsCrown,
  VisitorTreesCrown,
  VisitorGoldBonus,
  VisitorEnhancementGold,
  VisitorTreeVisitorAnimal,
  VisitorToolsBonus
}

export function getGardenCards() {
  return getEnumValues(Garden).concat(
    Garden.LionIrrigation,
    Garden.MonkeyIrrigation,
    Garden.PeacockIrrigation,
    Garden.CedarIrrigation,
    Garden.DatePalm,
    Garden.DatePalm,
    Garden.DatePalm,
    Garden.DatePalm,
    Garden.DatePalm
  )
}

export type GardenAnatomy = {
  main?: MainSight
  irrigation?: boolean
  flowers?: Flower[]
  crown?: boolean
  gold?: boolean
  tools?: boolean
  animalScoring?: number[]
}

export enum Flower {
  Blue = 1,
  Red,
  Yellow
}

export enum Animal {
  Lion = 1,
  Monkey,
  Peacock
}

export enum Tree {
  DragonTree = 11,
  Cedar,
  DatePalm
}

export const treeScore: Record<Tree, number[]> = {
  [Tree.DragonTree]: [2, 7],
  [Tree.Cedar]: [2, 5, 9],
  [Tree.DatePalm]: [3, 7, 12, 18]
}

export enum Visitor {
  BlueFlowers = 21,
  YellowFlowers,
  RedFlowers,
  Irrigation,
  Crowns,
  Flowers,
  Visitors,
  Objectives,
  Animals,
  Trees,
  GoldBonus,
  Enhancement,
  TreeVisitorAnimal,
  ToolsBonus
}

export type MainSight = Animal | Tree | Visitor

export const isAnimal = (main?: MainSight): main is Animal => main !== undefined && main < 10
export const isTree = (main?: MainSight): main is Tree => main !== undefined && main > 10 && main < 20
export const isVisitor = (main?: MainSight): main is Visitor => main !== undefined && main > 20

export const gardensAnatomy: Record<Garden, GardenAnatomy> = {
  [Garden.LionIrrigation]: { main: Animal.Lion, irrigation: true, animalScoring: [4, 2, 2] },
  [Garden.Lion]: { main: Animal.Lion, animalScoring: [5, 3, 3] },
  [Garden.MonkeyIrrigation]: { main: Animal.Monkey, irrigation: true, animalScoring: [2, 4, 2] },
  [Garden.MonkeyBY]: { main: Animal.Monkey, flowers: [Flower.Blue, Flower.Yellow], animalScoring: [2, 3, 2] },
  [Garden.MonkeyRY]: { main: Animal.Monkey, flowers: [Flower.Red, Flower.Yellow], animalScoring: [2, 3, 2] },
  [Garden.MonkeyBR]: { main: Animal.Monkey, flowers: [Flower.Blue, Flower.Red], animalScoring: [2, 3, 2] },
  [Garden.Monkey]: { main: Animal.Monkey, animalScoring: [3, 5, 3] },
  [Garden.PeacockIrrigation]: { main: Animal.Peacock, irrigation: true, animalScoring: [2, 2, 4] },
  [Garden.PeacockCrown]: { main: Animal.Peacock, crown: true, animalScoring: [2, 2, 4] },
  [Garden.PeacockGold]: { main: Animal.Peacock, gold: true, animalScoring: [2, 2, 4] },
  [Garden.PeacockTools]: { main: Animal.Peacock, tools: true, animalScoring: [2, 2, 4] },
  [Garden.Peacock]: { main: Animal.Peacock, animalScoring: [3, 3, 5] },
  [Garden.DatePalm]: { main: Tree.DatePalm },
  [Garden.CedarIrrigation]: { main: Tree.Cedar, irrigation: true },
  [Garden.CedarCrown]: { main: Tree.Cedar, crown: true },
  [Garden.CedarTools]: { main: Tree.Cedar, tools: true },
  [Garden.CedarGold]: { main: Tree.Cedar, gold: true },
  [Garden.DragonTreeIrrigation]: { main: Tree.DragonTree, irrigation: true },
  [Garden.DragonTreeB]: { main: Tree.DragonTree, flowers: [Flower.Blue] },
  [Garden.DragonTreeR]: { main: Tree.DragonTree, flowers: [Flower.Red] },
  [Garden.DragonTreeY]: { main: Tree.DragonTree, flowers: [Flower.Yellow] },
  [Garden.EmptyBRY]: { flowers: [Flower.Blue, Flower.Red, Flower.Yellow] },
  [Garden.EmptyBRCrown]: { flowers: [Flower.Blue, Flower.Red], crown: true },
  [Garden.EmptyBYCrown]: { flowers: [Flower.Blue, Flower.Yellow], crown: true },
  [Garden.EmptyYRCrown]: { flowers: [Flower.Yellow, Flower.Red], crown: true },
  [Garden.EmptyBRTools]: { flowers: [Flower.Blue, Flower.Red], tools: true },
  [Garden.EmptyBYTools]: { flowers: [Flower.Blue, Flower.Yellow], tools: true },
  [Garden.EmptyYRTools]: { flowers: [Flower.Yellow, Flower.Red], tools: true },
  [Garden.EmptyBRGold]: { flowers: [Flower.Blue, Flower.Red], gold: true },
  [Garden.EmptyBYGold]: { flowers: [Flower.Blue, Flower.Yellow], gold: true },
  [Garden.EmptyYRGold]: { flowers: [Flower.Yellow, Flower.Red], gold: true },
  [Garden.EmptyBBGold]: { flowers: [Flower.Blue, Flower.Blue], gold: true },
  [Garden.EmptyRRGold]: { flowers: [Flower.Red, Flower.Red], gold: true },
  [Garden.EmptyYYGold]: { flowers: [Flower.Yellow, Flower.Yellow], gold: true },
  [Garden.EmptyBBTools]: { flowers: [Flower.Blue, Flower.Blue], tools: true },
  [Garden.EmptyRRTools]: { flowers: [Flower.Red, Flower.Red], tools: true },
  [Garden.EmptyYYTools]: { flowers: [Flower.Yellow, Flower.Yellow], tools: true },
  [Garden.EmptyBRIrrigation]: { irrigation: true, flowers: [Flower.Blue, Flower.Red] },
  [Garden.EmptyBYIrrigation]: { irrigation: true, flowers: [Flower.Blue, Flower.Yellow] },
  [Garden.EmptyRYIrrigation]: { irrigation: true, flowers: [Flower.Yellow, Flower.Red] },
  [Garden.EmptyBIrrigationCrown]: { irrigation: true, flowers: [Flower.Blue], crown: true },
  [Garden.EmptyRIrrigationCrown]: { irrigation: true, flowers: [Flower.Red], crown: true },
  [Garden.EmptyYIrrigationCrown]: { irrigation: true, flowers: [Flower.Yellow], crown: true },
  [Garden.EmptyBIrrigationGold]: { irrigation: true, flowers: [Flower.Blue], gold: true },
  [Garden.EmptyRIrrigationGold]: { irrigation: true, flowers: [Flower.Red], gold: true },
  [Garden.EmptyYIrrigationGold]: { irrigation: true, flowers: [Flower.Yellow], gold: true },
  [Garden.EmptyBIrrigationTools]: { irrigation: true, flowers: [Flower.Blue], tools: true },
  [Garden.EmptyRIrrigationTools]: { irrigation: true, flowers: [Flower.Red], tools: true },
  [Garden.EmptyYIrrigationTools]: { irrigation: true, flowers: [Flower.Yellow], tools: true },
  [Garden.EmptyBCrownGold]: { flowers: [Flower.Blue], crown: true, gold: true },
  [Garden.EmptyRCrownGold]: { flowers: [Flower.Red], crown: true, gold: true },
  [Garden.EmptyYCrownGold]: { flowers: [Flower.Yellow], crown: true, gold: true },
  [Garden.VisitorBlueFlowersIrrigation]: { main: Visitor.BlueFlowers, irrigation: true },
  [Garden.VisitorYellowFlowersIrrigation]: { main: Visitor.YellowFlowers, irrigation: true },
  [Garden.VisitorRedFlowersIrrigation]: { main: Visitor.RedFlowers, irrigation: true },
  [Garden.VisitorIrrigation]: { main: Visitor.Irrigation, irrigation: true },
  [Garden.VisitorCrowns]: { main: Visitor.Crowns, crown: true },
  [Garden.VisitorFlowers]: { main: Visitor.Flowers },
  [Garden.VisitorVisitorsIrrigation]: { main: Visitor.Visitors, irrigation: true },
  [Garden.VisitorObjectivesCrown]: { main: Visitor.Objectives, crown: true },
  [Garden.VisitorAnimalsCrown]: { main: Visitor.Animals, crown: true },
  [Garden.VisitorTreesCrown]: { main: Visitor.Trees, crown: true },
  [Garden.VisitorGoldBonus]: { main: Visitor.GoldBonus, irrigation: true, gold: true },
  [Garden.VisitorEnhancementGold]: { main: Visitor.Enhancement, gold: true },
  [Garden.VisitorTreeVisitorAnimal]: { main: Visitor.TreeVisitorAnimal },
  [Garden.VisitorToolsBonus]: { main: Visitor.ToolsBonus, irrigation: true, tools: true }
}
