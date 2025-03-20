import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getPlayerLocation, PlayerColumn } from './PlayerLocation'

class FirstPlayerMarkerPlaceLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { column, line } = getPlayerLocation(context, location.player!)
    return {
      x: column === PlayerColumn.Left ? -36 : 36,
      y: line * 15 - 30
    }
  }
}

export const firstPlayerMarkerPlaceLocator = new FirstPlayerMarkerPlaceLocator()
