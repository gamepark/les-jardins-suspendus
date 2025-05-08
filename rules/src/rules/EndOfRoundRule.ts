import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class EndOfRoundRule extends MaterialRulesPart {
  onRuleStart() {
    const firstPlayer = this.material(MaterialType.FirstPlayerMarker).getItem()!.location.player
    return [
      ...this.material(MaterialType.Gardener)
        .sort((item) => -item.location.x!)
        .sort((item) => -item.location.id!)
        .moveItems((item) => {
          const player = item.id as PlayerColor
          if (this.game.players.includes(player)) {
            return { type: LocationType.PlayerGardeners, player: item.id as PlayerColor }
          } else {
            return { type: LocationType.AutomaGardeners }
          }
        }),
      firstPlayer ? this.startPlayerTurn(RuleId.PlaceGardenCard, firstPlayer) : this.startRule(RuleId.Automa)
    ]
  }
}
