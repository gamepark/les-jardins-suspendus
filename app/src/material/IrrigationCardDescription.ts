import { IrrigationPattern } from '@gamepark/les-jardins-suspendus/material/IrrigationPattern'
import { CardDescription } from '@gamepark/react-game'
import BordersPattern from '../images/cards/irrigation/BordersPattern.jpg'
import CenterPattern from '../images/cards/irrigation/CenterPattern.jpg'
import HPattern from '../images/cards/irrigation/HPattern.jpg'
import LeftPattern from '../images/cards/irrigation/LeftPattern.jpg'
import RightPattern from '../images/cards/irrigation/RightPattern.jpg'
import { IrrigationCardHelp } from './help/IrrigationCardHelp'

class IrrigationCardDescription extends CardDescription {
  width = 6
  height = 6

  images = {
    [IrrigationPattern.Left]: LeftPattern,
    [IrrigationPattern.Right]: RightPattern,
    [IrrigationPattern.Borders]: BordersPattern,
    [IrrigationPattern.Center]: CenterPattern,
    [IrrigationPattern.H]: HPattern
  }

  help = IrrigationCardHelp
}

export const irrigationCardDescription = new IrrigationCardDescription()
