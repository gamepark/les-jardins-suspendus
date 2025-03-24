import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RevealNewGardenCardRule extends PlayerTurnRule {
  onRuleStart() {
    const column = [1, 2, 3].find((column) => this.material(MaterialType.GardenCard).location(LocationType.MainBoardSpace).locationId(column).length < 4)
    const isEndOfRound = this.material(MaterialType.Gardener).location(LocationType.PlayerGardeners).length === 0
    const isGameOver = isEndOfRound && this.material(MaterialType.GardenCard).location(LocationType.PlayerGarden).length === 12 * this.game.players.length
    return [
      this.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).deck().dealOne({ type: LocationType.MainBoardSpace, id: column }),
      isGameOver ? this.endGame() : isEndOfRound ? this.startRule(RuleId.EndOfRound) : this.startPlayerTurn(RuleId.PlaceGardenCard, this.nextPlayer)
    ]
  }
}
