import { PileLocator } from '@gamepark/react-game'
import { miniBoardDescription } from '../material/MiniBoardDescription'

class GoldCoinsStockLocator extends PileLocator {
  coordinates = { x: -40, y: miniBoardDescription.height / 2 }
  radius = 3
}

export const goldCoinsStockLocator = new GoldCoinsStockLocator()
