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
