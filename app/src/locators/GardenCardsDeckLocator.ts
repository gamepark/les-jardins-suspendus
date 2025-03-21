import { DeckLocator } from '@gamepark/react-game'
import { gardenCardDescription } from '../material/GardenCardDescription'

class GardenCardsDeckLocator extends DeckLocator {
  coordinates = { x: -20, y: gardenCardDescription.height / 2 }
}

export const gardenCardsDeckLocator = new GardenCardsDeckLocator()
