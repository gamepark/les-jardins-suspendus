import { getEnumValues, MaterialGameSetup } from '@gamepark/rules-api'
import { sampleSize } from 'lodash'
import { LesJardinsSuspendusOptions } from './LesJardinsSuspendusOptions'
import { LesJardinsSuspendusRules } from './LesJardinsSuspendusRules'
import { Enhancement, EnhancementId, EnhancementType, getEnhancementType } from './material/Enhancement'
import { getGardenCards } from './material/Garden'
import { IrrigationPattern } from './material/IrrigationPattern'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Objective } from './material/Objective'
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
    this.setupEnhancementTiles()
    this.setupObjectives()
    this.setupIrrigationCards()
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

  setupEnhancementTiles() {
    const ids = getEnumValues(Enhancement).map<EnhancementId>((enhancement) => ({
      front: enhancement,
      back: getEnhancementType(enhancement)
    }))
    this.material(MaterialType.EnhancementTile).createItems(
      ids.map((id) => ({
        id,
        location: {
          type: LocationType.EnhancementPile,
          id: id.back,
          rotation: true
        }
      }))
    )
    for (const type of getEnumValues(EnhancementType)) {
      this.material(MaterialType.EnhancementTile).locationId(type).shuffle()
      this.material(MaterialType.EnhancementTile)
        .locationId(type)
        .maxBy((item) => item.location.x!)
        .rotateItem(false)
    }
  }

  setupObjectives() {
    this.material(MaterialType.ObjectiveTile).createItems(
      sampleSize(getEnumValues(Objective), 4).map((id, index) => ({
        id,
        location: {
          type: LocationType.ObjectiveTileSpace,
          id: index + 1
        }
      }))
    )
  }

  setupIrrigationCards() {
    const cards = sampleSize(getEnumValues(IrrigationPattern), this.players.length)
    for (let i = 0; i < this.players.length; i++) {
      this.material(MaterialType.IrrigationCard).createItem({
        id: cards[i],
        location: {
          type: LocationType.PlayerIrrigationCard,
          player: this.players[i]
        }
      })
    }
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
