import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { minBy } from 'es-toolkit/compat'
import { Garden, GardenAnatomy, gardensAnatomy } from '../material/Garden'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlaceGardenCardRule extends PlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.GardenPlaced, false)
    return []
  }

  getPlayerMoves() {
    const cards = this.availableCards
    return this.validDestinations.flatMap((destination) =>
      cards.moveItems({
        type: LocationType.PlayerGarden,
        player: this.player,
        ...destination
      })
    )
  }

  get availableCards() {
    const tools = this.material(MaterialType.Tool).location(LocationType.PlayerTools).player(this.player).getQuantity()
    const columns = this.availableColumns
    return this.material(MaterialType.GardenCard)
      .location(LocationType.GameBoardSpace)
      .locationId<number>((id) => columns.includes(id))
      .location((l) => l.y! <= tools)
  }

  get availableColumns() {
    const gardeners = this.material(MaterialType.Gardener).location(LocationType.GardenerSpace)
    const gardenersSpaces = Math.max(2, this.game.players.length)
    return [1, 2, 3].filter((column) => gardeners.locationId(column).length < gardenersSpaces)
  }

  get validDestinations() {
    const garden = this.material(MaterialType.GardenCard).location(LocationType.PlayerGarden).player(this.player)
    if (garden.length === 0) {
      return [{ x: 0, y: 0 }]
    }
    const destinations: XYCoordinates[] = []
    const firstLevel = garden.location((l) => l.y === 0).getItems()
    const xMin = minBy(firstLevel, (item) => item.location.x)!.location.x!
    if (firstLevel.length < 5) {
      destinations.push({ x: xMin - 1, y: 0 }, { x: xMin + firstLevel.length, y: 0 })
    }
    if (firstLevel.length > 1) {
      const secondLevel = garden.location((l) => l.y === 1).getItems()
      for (let x = xMin; x < xMin + firstLevel.length - 1; x++) {
        if (!secondLevel.some((item) => item.location.x === x)) {
          destinations.push({ x, y: 1 })
        }
      }
      if (secondLevel.length > 1) {
        const thirdLevel = garden.location((l) => l.y === 2).getItems()
        for (const item of secondLevel) {
          const x = item.location.x!
          if (!thirdLevel.some((item) => item.location.x === x) && secondLevel.some((item) => item.location.x === x + 1)) {
            destinations.push({ x, y: 2 })
          }
        }
      }
    }
    return destinations
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.GardenCard)(move) && move.location.type === LocationType.PlayerGarden) {
      this.memorize(Memory.GardenPlaced, true)
      const origin = this.material(MaterialType.GardenCard).getItem(move.itemIndex).location
      if (origin.type === LocationType.GameBoardSpace) {
        const column = origin.id as number
        const playerGardeners = this.material(MaterialType.Gardener).location(LocationType.PlayerGardeners).player(this.player)
        const moves = [
          playerGardeners.moveItem({
            type: LocationType.GardenerSpace,
            id: column
          })
        ]
        if (origin.y! > 0) {
          const playerTools = this.material(MaterialType.Tool).location(LocationType.PlayerTools).player(this.player)
          moves.push(playerTools.moveItem({ type: LocationType.ToolsStock }, origin.y))
        }
        return moves
      }
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.GardenCard)(move) && move.location.type === LocationType.PlayerGarden) {
      const anatomy = gardensAnatomy[this.material(MaterialType.GardenCard).getItem<Garden>(move.itemIndex).id]
      return [...this.getBonuses(anatomy, move.location.y! + 1), this.startRule(RuleId.BuyEnhancement)]
    }
    return []
  }

  getBonuses(anatomy: GardenAnatomy, level: number) {
    const moves: MaterialMove[] = []
    if (anatomy.crown) {
      const firstPlayerMarker = this.material(MaterialType.FirstPlayerMarker)
      if (firstPlayerMarker.getItem()!.location.player !== this.player) {
        moves.push(firstPlayerMarker.moveItem({ type: LocationType.FirstPlayerMarkerPlace, player: this.player }))
      }
    }
    if (anatomy.gold) {
      const goldStock = this.material(MaterialType.GoldCoin).location(LocationType.GoldCoinsStock)
      if (goldStock.getQuantity() > 0) {
        moves.push(goldStock.moveItem({ type: LocationType.PlayerGoldCoins, player: this.player }, level))
      }
    }
    if (anatomy.tools) {
      const toolsStock = this.material(MaterialType.Tool).location(LocationType.ToolsStock)
      if (toolsStock.getQuantity() > 0) {
        moves.push(toolsStock.moveItem({ type: LocationType.PlayerTools, player: this.player }, level))
      }
    }
    return moves
  }

  onRuleEnd() {
    this.forget(Memory.GardenPlaced)
    return []
  }
}
