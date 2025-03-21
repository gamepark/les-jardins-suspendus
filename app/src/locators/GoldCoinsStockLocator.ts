import { PileLocator } from '@gamepark/react-game'

class GoldCoinsStockLocator extends PileLocator {
  coordinates = { x: -30 }
  radius = 3
}

export const goldCoinsStockLocator = new GoldCoinsStockLocator()
