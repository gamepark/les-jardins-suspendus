import { EnhancementId, EnhancementType } from '@gamepark/les-jardins-suspendus/material/Enhancement'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class EmptyGardenLocator extends Locator {
  parentItemType = MaterialType.GardenCard

  getItemCoordinates(item: MaterialItem<PlayerColor, LocationType, EnhancementId>) {
    switch (item.id.back) {
      case EnhancementType.Simple:
        return { x: 0.05, y: 0.15 }
      case EnhancementType.Bonus:
        return { x: 0.05, y: 0.6 }
      case EnhancementType.Irrigation:
        return { x: 0.05, y: -0.55 }
    }
  }

  getHoverTransform = () => ['translateZ(10em)', 'scale(2.5)']
}

export const emptyGardenLocator = new EmptyGardenLocator()
