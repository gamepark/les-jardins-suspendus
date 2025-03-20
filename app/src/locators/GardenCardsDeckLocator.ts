import { DeckLocator } from '@gamepark/react-game'

class GardenCardsDeckLocator extends DeckLocator {
  coordinates = { x: 20 }
}

export const gardenCardsDeckLocator = new GardenCardsDeckLocator()
