import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RevealNewGardenCardRule extends PlayerTurnRule {
  onRuleStart() {
    const column = [1, 2, 3].find((column) => this.material(MaterialType.GardenCard).location(LocationType.GameBoardSpace).locationId(column).length < 4)
    const moves: MaterialMove[] = [
      this.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).deck().dealOne({ type: LocationType.GameBoardSpace, id: column })
    ]
    const enhancements = this.material(MaterialType.EnhancementTile).location(LocationType.EnhancementPile)
    const enhancementToReveal = enhancements.location(
      (l) => l.rotation === true && !enhancements.getItems().some((e) => e.location.id === l.id && e.location.x! > l.x!)
    )
    if (enhancementToReveal.length === 1) {
      moves.push(enhancementToReveal.rotateItem(false))
    }
    moves.push(this.nextRule)
    return moves
  }

  get automaHasGardener() {
    return this.material(MaterialType.Gardener).location(LocationType.AutomaGardeners).length > 0
  }

  get isEndOfRound() {
    return this.material(MaterialType.Gardener).location(LocationType.PlayerGardeners).length === 0
  }

  get isGameOver() {
    return this.material(MaterialType.GardenCard).location(LocationType.PlayerGarden).length === 12 * this.game.players.length
  }

  get nextRule() {
    if (this.game.players.length === 1 && this.automaHasGardener) {
      return this.startRule(RuleId.Automa)
    } else if (this.isEndOfRound) {
      if (this.isGameOver) {
        return this.endGame()
      } else {
        return this.startRule(RuleId.EndOfRound)
      }
    } else {
      return this.startPlayerTurn(RuleId.PlaceGardenCard, this.nextPlayer)
    }
  }
}
