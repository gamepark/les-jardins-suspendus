import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerGardenLocator } from './PlayerGardenLocator'

class PlayerGoldCoinsLocator extends PileLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = playerGardenLocator.getCoordinates(location, context)
    return {
      x: x < 0 ? x + 16.5 : x - 16.5,
      y: y - 6.3
    }
  }

  radius = 2
}

export const playerGoldCoinsLocator = new PlayerGoldCoinsLocator()
