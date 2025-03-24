import { CustomMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class CompleteObjectiveRule extends PlayerTurnRule {
  getPlayerMoves() {
    return [this.customMove(CustomMoveType.Pass)]
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [this.startRule(RuleId.RevealNewGardenCard)]
    }
    return []
  }
}
