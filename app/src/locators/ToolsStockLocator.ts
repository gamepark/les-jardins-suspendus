import { PileLocator } from '@gamepark/react-game'
import { gardenCardDescription } from '../material/GardenCardDescription'

class ToolsStockLocator extends PileLocator {
  coordinates = { x: -30, y: gardenCardDescription.height / 2 }
  radius = 3
}

export const toolsStockLocator = new ToolsStockLocator()
