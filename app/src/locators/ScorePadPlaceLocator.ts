import { Locator } from '@gamepark/react-game'
import { miniBoardDescription } from '../material/MiniBoardDescription'

class ScorePadPlaceLocator extends Locator {
  coordinates = { x: -55, y: miniBoardDescription.height / 2 }
}

export const scorePadPlaceLocator = new ScorePadPlaceLocator()
