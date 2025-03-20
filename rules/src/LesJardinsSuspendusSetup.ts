import { MaterialGameSetup } from '@gamepark/rules-api'
import { LesJardinsSuspendusOptions } from './LesJardinsSuspendusOptions'
import { LesJardinsSuspendusRules } from './LesJardinsSuspendusRules'
import { getGardenCards } from './material/GardenCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class LesJardinsSuspendusSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, LesJardinsSuspendusOptions> {
  Rules = LesJardinsSuspendusRules

  setupMaterial(_options: LesJardinsSuspendusOptions) {
    this.setupGardenCardsDeck()
    this.dealGardenCards()
  }

  setupGardenCardsDeck() {
    this.material(MaterialType.GardenCard).createItems(getGardenCards().map((id) => ({ id, location: { type: LocationType.GardenCardsDeck } })))
    this.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).shuffle()
  }

  dealGardenCards() {
    const deck = this.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).deck()
    deck.deal({ type: LocationType.MainBoardSpace, id: 1 }, 4)
    deck.deal({ type: LocationType.MainBoardSpace, id: 2 }, 4)
    deck.deal({ type: LocationType.MainBoardSpace, id: 3 }, 4)
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
