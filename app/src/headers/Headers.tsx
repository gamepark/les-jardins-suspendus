import { RuleId } from '@gamepark/les-jardins-suspendus/rules/RuleId'
import { ComponentType } from 'react'
import { AutomaHeader } from './AutomaHeader'
import { BuyEnhancementHeader } from './BuyEnhancementHeader'
import { CompleteObjectiveHeader } from './CompleteObjectiveHeader'
import { EndOfRoundHeader } from './EndOfRoundHeader'
import { PlaceGardenCardHeader } from './PlaceGardenCardHeader'
import { RevealNewGardenCardHeader } from './RevealNewGardenCardHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlaceGardenCard]: PlaceGardenCardHeader,
  [RuleId.BuyEnhancement]: BuyEnhancementHeader,
  [RuleId.CompleteObjective]: CompleteObjectiveHeader,
  [RuleId.RevealNewGardenCard]: RevealNewGardenCardHeader,
  [RuleId.EndOfRound]: EndOfRoundHeader,
  [RuleId.Automa]: AutomaHeader
}
