import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { gameBoardDescription } from '../material/GameBoardDescription'

class MainBoardSpaceLocator extends Locator {
  parentItemType = MaterialType.GameBoard

  getParentItem(_location: Location, context: MaterialContext) {
    return gameBoardDescription.getStaticItems(context)[0]
  }

  getPositionOnParent({ id, y = 0 }: Location) {
    const fixIrregularY = y === 0 ? -0.05 : y === 1 ? -0.13 : y === 2 ? -0.08 : 0
    return { x: (id - 2) * 32 + 50, y: y * -14.2 + 91 + fixIrregularY }
  }

  navigationSorts = []
}

export const mainBoardSpaceLocator = new MainBoardSpaceLocator()
