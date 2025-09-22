import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerGardenLocator } from './PlayerGardenLocator'

class PlayerToolsLocator extends PileLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = playerGardenLocator.getCoordinates(location, context)
    return {
      x: x < 0 ? x + 13.7 : x - 13.7,
      y: y - 12.6
    }
  }

  radius = { x: 2.5, y: 2 }
}

export const playerToolsLocator = new PlayerToolsLocator()
