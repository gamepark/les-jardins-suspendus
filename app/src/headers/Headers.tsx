/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/les-jardins-suspendus/rules/RuleId'
import { ComponentType } from 'react'
import { BuyEnhancementHeader } from './BuyEnhancementHeader'
import { PlaceGardenCardHeader } from './PlaceGardenCardHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlaceGardenCard]: PlaceGardenCardHeader,
  [RuleId.BuyEnhancement]: BuyEnhancementHeader
}
