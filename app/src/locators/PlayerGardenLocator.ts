import { css } from '@emotion/react'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { Memory } from '@gamepark/les-jardins-suspendus/rules/Memory'
import { PlaceGardenCardRule } from '@gamepark/les-jardins-suspendus/rules/PlaceGardenCardRule'
import { RuleId } from '@gamepark/les-jardins-suspendus/rules/RuleId'
import { DropAreaDescription, HexagonalGridLocator, MaterialContext } from '@gamepark/react-game'
import { HexGridSystem, Location } from '@gamepark/rules-api'
import { gameBoardDescription } from '../material/GameBoardDescription'
import { gardenCardDescription } from '../material/GardenCardDescription'
import { getPlayerLocation, PlayerColumn } from './PlayerLocation'

class PlayerGardenLocator extends HexagonalGridLocator {
  locationDescription = new PlayerGardenDescription(gardenCardDescription)

  getLocations({ player, rules }: MaterialContext) {
    if (rules.game.rule?.id === RuleId.PlaceGardenCard && !rules.remind(Memory.GardenPlaced) && rules.getActivePlayer() === player) {
      return new PlaceGardenCardRule(rules.game).validDestinations.map((location) => ({ ...location, player }))
    }
    return []
  }

  coordinatesSystem = HexGridSystem.Axial
  size = { x: 3.7, y: -4.2 }

  baseY = gameBoardDescription.height / 2 + gardenCardDescription.height / 2

  getCoordinates(location: Location, context: MaterialContext) {
    const { column, line } = getPlayerLocation(context, location.player!)
    const deltaY = context.rules.players.length === 5 && column === PlayerColumn.Right ? 20 : 18.2
    return {
      x: column === PlayerColumn.Left ? -34 : 34,
      y: this.baseY - line * deltaY
    }
  }

  getLocationCoordinates(location: Location, context: MaterialContext) {
    const { x, y, z } = super.getLocationCoordinates(location, context)
    const garden = context.rules.material(MaterialType.GardenCard).location(LocationType.PlayerGarden).player(location.player)
    const minX = garden.minBy((item) => item.location.x!).getItem()?.location.x ?? 0
    const maxX = garden.maxBy((item) => item.location.x!).getItem()?.location.x ?? 0
    const deltaX = ((minX + maxX) * this.size.x * Math.sqrt(3)) / 2
    return { x: x! - deltaX, y, z }
  }
}

class PlayerGardenDescription extends DropAreaDescription {
  extraCss = css`
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer !important;
  `
}

export const playerGardenLocator = new PlayerGardenLocator()
