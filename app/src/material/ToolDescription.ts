import { TokenDescription } from '@gamepark/react-game'
import Tool from '../images/Tool.png'
import { ToolHelp } from './help/ToolHelp'

class ToolDescription extends TokenDescription {
  width = 3.54
  height = 3.2
  image = Tool
  transparency = true
  help = ToolHelp
}

export const toolDescription = new ToolDescription()
