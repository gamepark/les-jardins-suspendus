import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerGardenLocator } from './PlayerGardenLocator'

class FirstPlayerMarkerPlaceLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = playerGardenLocator.getCoordinates(location, context)
    return {
      x: x < 0 ? x + 19.3 : x - 19.3,
      y: y - 0.1
    }
  }
}

export const firstPlayerMarkerPlaceLocator = new FirstPlayerMarkerPlaceLocator()
