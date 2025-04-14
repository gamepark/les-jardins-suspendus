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
    const isEndOfRound = this.material(MaterialType.Gardener).location(LocationType.PlayerGardeners).length === 0
    const isGameOver = isEndOfRound && this.material(MaterialType.GardenCard).location(LocationType.PlayerGarden).length === 12 * this.game.players.length
    if (isGameOver) {
      moves.push(this.endGame())
    } else if (isEndOfRound) {
      moves.push(this.startRule(RuleId.EndOfRound))
    } else {
      moves.push(this.startPlayerTurn(RuleId.PlaceGardenCard, this.nextPlayer))
    }
    return moves
  }
}
