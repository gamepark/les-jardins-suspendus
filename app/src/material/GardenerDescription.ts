import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import BeigeGardener from '../images/gardeners/BeigeGardener.png'
import BlueGardener from '../images/gardeners/BlueGardener.png'
import GreyGardener from '../images/gardeners/GreyGardener.png'
import PurpleGardener from '../images/gardeners/PurpleGardener.png'
import RedGardener from '../images/gardeners/RedGardener.png'
import { GardenerHelp } from './help/GardenerHelp'

class GardenerDescription extends TokenDescription {
  width = 1.95
  height = 2

  images = {
    [PlayerColor.Grey]: GreyGardener,
    [PlayerColor.Red]: RedGardener,
    [PlayerColor.Purple]: PurpleGardener,
    [PlayerColor.Beige]: BeigeGardener,
    [PlayerColor.Blue]: BlueGardener
  }

  transparency = true

  help = GardenerHelp
}

export const gardenerDescription = new GardenerDescription()
