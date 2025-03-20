import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { ObjectiveSpace } from '@gamepark/les-jardins-suspendus/material/ObjectiveSpace'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { gameBoardDescription } from '../material/GameBoardDescription'

class ObjectiveTileSpaceLocator extends Locator {
  parentItemType = MaterialType.GameBoard

  getParentItem(_location: Location, context: MaterialContext) {
    return gameBoardDescription.getStaticItems(context)[0]
  }

  getPositionOnParent(location: Location) {
    switch (location.id as ObjectiveSpace) {
      case ObjectiveSpace.Score5Or3:
        return { x: 14, y: 12 }
      case ObjectiveSpace.Score4Or2:
        return { x: 38, y: 12 }
      case ObjectiveSpace.ToolScore2Or1:
        return { x: 62, y: 12 }
      case ObjectiveSpace.GoldScore2Or1:
        return { x: 86, y: 12 }
    }
  }

  navigationSorts = []
}

export const objectiveTileSpaceLocator = new ObjectiveTileSpaceLocator()
