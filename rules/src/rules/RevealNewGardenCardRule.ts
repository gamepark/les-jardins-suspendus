import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RevealNewGardenCardRule extends PlayerTurnRule {
  onRuleStart() {
    const column = [1, 2, 3].find((column) => this.material(MaterialType.GardenCard).location(LocationType.MainBoardSpace).locationId(column).length < 4)
    return [
      this.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).deck().dealOne({ type: LocationType.MainBoardSpace, id: column }),
      this.startPlayerTurn(RuleId.PlaceGardenCard, this.nextPlayer)
    ]
  }
}
