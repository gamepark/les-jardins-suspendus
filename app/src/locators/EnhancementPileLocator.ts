import { EnhancementType } from '@gamepark/les-jardins-suspendus/material/Enhancement'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { gameBoardDescription } from '../material/GameBoardDescription'

class EnhancementPileLocator extends DeckLocator {
  parentItemType = MaterialType.GameBoard

  getParentItem(_location: Location, context: MaterialContext) {
    return gameBoardDescription.getStaticItems(context)[0]
  }

  getPositionOnParent(location: Location) {
    switch (location.id as EnhancementType) {
      case EnhancementType.Simple:
        return { x: 17.5, y: 30.3 }
      case EnhancementType.Bonus:
        return { x: 50, y: 29.8 }
      case EnhancementType.Irrigation:
        return { x: 82.4, y: 29.8 }
    }
  }

  getHoverTransform(item: MaterialItem) {
    return item.location.rotation ? [] : ['translateZ(10em)', 'scale(2.5)']
  }

  navigationSorts = []
}

export const enhancementPileLocator = new EnhancementPileLocator()
