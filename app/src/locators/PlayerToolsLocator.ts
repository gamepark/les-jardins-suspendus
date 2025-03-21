import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '../../../../rules-api/src'
import { getPlayerLocation, PlayerColumn } from './PlayerLocation'

class PlayerToolsLocator extends PileLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { column, line } = getPlayerLocation(context, location.player!)
    return {
      x: column === PlayerColumn.Left ? -30 : 30,
      y: line * 15 - 25
    }
  }

  radius = 3
}

export const playerToolsLocator = new PlayerToolsLocator()
