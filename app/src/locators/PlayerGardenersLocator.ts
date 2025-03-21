import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerGardenLocator } from './PlayerGardenLocator'

class PlayerGardenersLocator extends ListLocator {
  gap = { y: 2 }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = playerGardenLocator.getCoordinates(location, context)
    return {
      x: x < 0 ? x + 18.7 : x - 18.7,
      y: y - 14.8
    }
  }
}

export const playerGardenersLocator = new PlayerGardenersLocator()
