import { isMoveItemType, ItemMove, Location, PlayerTurnRule } from '@gamepark/rules-api'
import { EnhancementId, EnhancementType } from '../material/Enhancement'
import { Garden, gardensAnatomy } from '../material/Garden'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class BuyEnhancementRule extends PlayerTurnRule {
  getPlayerMoves() {
    const enhancements = this.availableEnhancements
    return this.validDestinations.flatMap((destination) => enhancements.moveItems(destination))
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
      const enhancementType = this.material(MaterialType.EnhancementTile).getItem<EnhancementId>(move.itemIndex).id.back
      const playerGold = this.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldCoins).player(this.player)
      return [playerGold.moveItem({ type: LocationType.GoldCoinsStock }, enhancementType + 1)]
    }
    return []
  }
}
