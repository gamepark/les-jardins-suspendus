import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { ObjectiveSpace } from '@gamepark/les-jardins-suspendus/material/ObjectiveSpace'
import { DropAreaDescription, FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { gameBoardDescription } from '../material/GameBoardDescription'

class ObjectiveSpaceLocator extends FlexLocator {
  parentItemType = MaterialType.GameBoard

  getParentItem(_location: Location, context: MaterialContext) {
    return gameBoardDescription.getStaticItems(context)[0]
  }

  getLocationDescription(_location: Location, context: MaterialContext) {
    const boardId = gameBoardDescription.getBoardId(context)
    return new DropAreaDescription({
      width: 4.3,
      height: boardId === 1 ? 2 : 3.8,
      borderRadius: 0.9
    })
  }

  gap = { y: 1.85 }
  lineGap = { x: 2.23 }
  maxLines = 2

  getLineSize(_location: Location, context: MaterialContext) {
    return gameBoardDescription.getBoardId(context) === 1 ? 1 : 2
  }

  getPositionOnParent(location: Location, context: MaterialContext) {
    const boardId = gameBoardDescription.getBoardId(context)
    return {
      x: this.getPositionX(location.id as ObjectiveSpace) + (boardId === 1 ? 0.3 : 0),
      y: this.getPositionY(boardId)
    }
  }

  getPositionX(objectiveSpace: ObjectiveSpace) {
    switch (objectiveSpace) {
      case ObjectiveSpace.Score5Or3:
        return 9.4
      case ObjectiveSpace.Score4Or2:
        return 33.2
      case ObjectiveSpace.ToolScore2Or1:
        return 58
      case ObjectiveSpace.GoldScore2Or1:
        return 81.4
    }
  }

  getPositionY(boardSide: number) {
    return boardSide === 1 ? 19.3 : 15.65
  }

  navigationSorts = []
}

export const objectiveSpaceLocator = new ObjectiveSpaceLocator()
