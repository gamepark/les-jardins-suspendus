import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { ScoreSheetBoxDescription } from './ScoreSheetBoxDescription'

export class ScorePadBoxLocator extends Locator {
  locationDescription = new ScoreSheetBoxDescription()
  parentItemType = MaterialType.ScorePad

  getPositionOnParent(location: Location) {
    return { x: 24.5 + location.x! * 16.8, y: this.positionY[location.y!] }
  }

  positionY = [6.5, 19.5, 28.4, 37.3, 46, 55.1, 64, 73.5, 83, 92.5]
}

export const scorePadBoxLocator = new ScorePadBoxLocator()
