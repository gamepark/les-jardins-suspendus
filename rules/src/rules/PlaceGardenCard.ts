import { PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { minBy } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class PlaceGardenCard extends PlayerTurnRule {
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
      .location(LocationType.MainBoardSpace)
      .locationId<number>((id) => columns.includes(id))
      .location((l) => l.y! <= tools)
  }

  get availableColumns() {
    const gardeners = this.material(MaterialType.Gardener).location(LocationType.GardenerSpace)
    const gardenersSpaces = Math.min(2, this.game.players.length)
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
}
