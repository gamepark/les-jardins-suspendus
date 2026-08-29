import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { RuleId } from '@gamepark/les-jardins-suspendus/rules/RuleId'
import { and, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations.configure(and(isRule(RuleId.EndOfRound), isMoveItemType(MaterialType.Gardener))).duration(400)
