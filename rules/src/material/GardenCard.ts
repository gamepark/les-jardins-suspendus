import { getEnumValues } from '@gamepark/rules-api'

export enum GardenCard {
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
  DragonTreeY,
  DragonTreeR,
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
  EmptyRRGold,
  EmptyBBGold,
  EmptyYYGold,
  EmptyYYTools,
  EmptyBBTools,
  EmptyRRTools,
  EmptyBRIrrigation,
  EmptyBYIrrigation,
  EmptyRYIrrigation,
  EmptyBIrrigationCrown,
  EmptyYIrrigationCrown,
  EmptyRIrrigationCrown,
  EmptyBIrrigationGold,
  EmptyYIrrigationGold,
  EmptyRIrrigationGold,
  EmptyBIrrigationTools,
  EmptyYIrrigationTools,
  EmptyRIrrigationTools,
  EmptyBCrownGold,
  EmptyYCrownGold,
  EmptyRCrownGold,
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
  return getEnumValues(GardenCard).concat(
    GardenCard.LionIrrigation,
    GardenCard.MonkeyIrrigation,
    GardenCard.PeacockIrrigation,
    GardenCard.CedarIrrigation,
    GardenCard.DatePalm, GardenCard.DatePalm, GardenCard.DatePalm, GardenCard.DatePalm, GardenCard.DatePalm
  )
}
