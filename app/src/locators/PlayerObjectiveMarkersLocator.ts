import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getPlayerLocation, PlayerColumn } from './PlayerLocation'

class PlayerObjectiveMarkersLocator extends ListLocator {
  getGap(location: Location, context: MaterialContext) {
    const { column } = getPlayerLocation(context, location.player!)
    return { x: column === PlayerColumn.Left ? 2.5 : -2.5 }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { column, line } = getPlayerLocation(context, location.player!)
    return {
      x: column === PlayerColumn.Left ? -32 : 32,
      y: line * 15 - 28
    }
  }
}

export const playerObjectiveMarkersLocator = new PlayerObjectiveMarkersLocator()
