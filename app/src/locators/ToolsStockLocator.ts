import { PileLocator } from '@gamepark/react-game'
import { miniBoardDescription } from '../material/MiniBoardDescription'

class ToolsStockLocator extends PileLocator {
  coordinates = { x: -30, y: miniBoardDescription.height / 2 }
  radius = 3
}

export const toolsStockLocator = new ToolsStockLocator()
