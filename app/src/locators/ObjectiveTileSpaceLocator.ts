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

  getPositionOnParent(location: Location, context: MaterialContext) {
    return {
      x: this.getPositionX(location.id as ObjectiveSpace),
      y: this.getPositionY(gameBoardDescription.getBoardId(context))
    }
  }

  getPositionX(objectiveSpace: ObjectiveSpace) {
    switch (objectiveSpace) {
      case ObjectiveSpace.Score5Or3:
        return 14
      case ObjectiveSpace.Score4Or2:
        return 38
      case ObjectiveSpace.ToolScore2Or1:
        return 62
      case ObjectiveSpace.GoldScore2Or1:
        return 86
    }
  }

  getPositionY(boardSide: number) {
    return boardSide === 1 ? 15.2 : 12
  }

  navigationSorts = []
}

export const objectiveTileSpaceLocator = new ObjectiveTileSpaceLocator()
