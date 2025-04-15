import { CustomMove, isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { EnhancementId, enhancementsAnatomy, EnhancementType } from '../material/Enhancement'
import { Garden, gardensAnatomy } from '../material/Garden'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { PlaceGardenCardRule } from './PlaceGardenCardRule'
import { RuleId } from './RuleId'

export class BuyEnhancementRule extends PlayerTurnRule {
  getPlayerMoves() {
    const enhancements = this.availableEnhancements
    const pass = this.customMove(CustomMoveType.Pass)
    return this.validDestinations.flatMap<MaterialMove>((destination) => enhancements.moveItems(destination)).concat(pass)
  }

  get availableEnhancements() {
    const gold = this.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldCoins).player(this.player).getQuantity()
    return this.material(MaterialType.EnhancementTile)
      .location(LocationType.EnhancementPile)
      .rotation(false)
      .locationId<EnhancementType>((id) => gold > id)
  }

  get validDestinations() {
    const destinations: Location[] = []
    const garden = this.material(MaterialType.GardenCard).location(LocationType.PlayerGarden).player(this.player)
    const enhancements = this.material(MaterialType.EnhancementTile).location(LocationType.EmptyGarden).getItems()
    for (const [index, item] of garden.entries) {
      if (!gardensAnatomy[item.id as Garden].main && !enhancements.some((enhancement) => enhancement.location.parent === index)) {
        destinations.push({ type: LocationType.EmptyGarden, parent: index })
      }
    }
    return destinations
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.EnhancementTile)(move) && move.location.type === LocationType.EmptyGarden) {
      const enhancement = this.material(MaterialType.EnhancementTile).getItem<EnhancementId>(move.itemIndex)
      const enhancementType = enhancement.id.back
      const playerGold = this.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldCoins).player(this.player)
      const anatomy = enhancementsAnatomy[enhancement.id.front!]
      const level = this.material(MaterialType.GardenCard).getItem(move.location.parent!).location.y! + 1
      return [
        playerGold.moveItem({ type: LocationType.GoldCoinsStock }, enhancementType + 1),
        ...new PlaceGardenCardRule(this.game).getBonuses(anatomy, level),
        this.startRule(RuleId.CompleteObjective)
      ]
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [this.startRule(RuleId.CompleteObjective)]
    }
    return []
  }
}
