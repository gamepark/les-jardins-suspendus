import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '../../../../rules-api'
import { getPlayerLocation, PlayerColumn } from './PlayerLocation'

class PlayerIrrigationCardLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { column, line } = getPlayerLocation(context, location.player!)
    return {
      x: column === PlayerColumn.Left ? -20 : 20,
      y: line * 15 - 30
    }
  }
}

export const playerIrrigationCardLocator = new PlayerIrrigationCardLocator()
