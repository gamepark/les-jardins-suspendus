import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { RuleId } from '@gamepark/les-jardins-suspendus/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations.when().rule(RuleId.EndOfRound).move(isMoveItemType(MaterialType.Gardener)).duration(0.4)
