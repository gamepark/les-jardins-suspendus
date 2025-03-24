import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class EndOfRoundRule extends MaterialRulesPart {
  onRuleStart() {
    const firstPlayer = this.material(MaterialType.FirstPlayerMarker).getItem()!.location.player!
    return [
      ...this.material(MaterialType.Gardener)
        .sort((item) => -item.location.x!)
        .sort((item) => -item.location.id!)
        .moveItems((item) => ({
          type: LocationType.PlayerGardeners,
          player: item.id as PlayerColor
        })),
      this.startPlayerTurn(RuleId.PlaceGardenCard, firstPlayer)
    ]
  }
}
