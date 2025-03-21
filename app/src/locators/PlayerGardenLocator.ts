import { css } from '@emotion/react'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { DropAreaDescription, HexagonalGridLocator, MaterialContext } from '@gamepark/react-game'
import { HexGridSystem, Location } from '@gamepark/rules-api'
import { range } from 'lodash'
import { gameBoardDescription } from '../material/GameBoardDescription'
import { gardenCardDescription } from '../material/GardenCardDescription'
import { getPlayerLocation, PlayerColumn } from './PlayerLocation'

class PlayerGardenLocator extends HexagonalGridLocator {
  locationDescription = new PlayerGardenDescription(gardenCardDescription)

  getLocations(context: MaterialContext) {
    return context.rules.players.flatMap((player) =>
      range(-2, 3)
        .map((x) => ({ x, y: 0 }))
        .concat(range(-2, 2).map((x) => ({ x, y: 1 })))
        .concat(range(-2, 1).map((x) => ({ x, y: 2 })))
        .map(({ x, y }) => ({
          type: LocationType.PlayerGarden,
          player,
          x,
          y
        }))
    )
  }

  coordinatesSystem = HexGridSystem.Axial
  size = { x: 3.7, y: -4.2 }

  baseY = gameBoardDescription.height / 2 + gardenCardDescription.height / 2

  getCoordinates(location: Location, context: MaterialContext) {
    const { column, line } = getPlayerLocation(context, location.player!)
    const deltaY = context.rules.players.length === 5 && column === PlayerColumn.Right ? 20 : 18.2
    return {
      x: column === PlayerColumn.Left ? -35 : 35,
      y: this.baseY - line * deltaY
    }
  }
}

class PlayerGardenDescription extends DropAreaDescription {
  extraCss = css`
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer !important;
  `
}

export const playerGardenLocator = new PlayerGardenLocator()
