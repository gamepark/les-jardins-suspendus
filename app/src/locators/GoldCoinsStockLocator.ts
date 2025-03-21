import { PileLocator } from '@gamepark/react-game'
import { gardenCardDescription } from '../material/GardenCardDescription'

class GoldCoinsStockLocator extends PileLocator {
  coordinates = { x: -40, y: gardenCardDescription.height / 2 }
  radius = 3
}

export const goldCoinsStockLocator = new GoldCoinsStockLocator()
