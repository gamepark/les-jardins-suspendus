import { DeckLocator } from '@gamepark/react-game'
import { miniBoardDescription } from '../material/MiniBoardDescription'

class GardenCardsDeckLocator extends DeckLocator {
  coordinates = { x: -20, y: miniBoardDescription.height / 2 }
  navigationSorts = []
}

export const gardenCardsDeckLocator = new GardenCardsDeckLocator()
