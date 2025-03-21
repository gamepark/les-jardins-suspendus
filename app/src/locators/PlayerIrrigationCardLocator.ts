import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerGardenLocator } from './PlayerGardenLocator'

class PlayerIrrigationCardLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = playerGardenLocator.getCoordinates(location, context)
    return {
      x: x < 0 ? x - 20 : x + 20,
      y: y - 6.3
    }
  }
}

export const playerIrrigationCardLocator = new PlayerIrrigationCardLocator()
