import { TokenDescription } from '@gamepark/react-game'
import GoldCoin from '../images/GoldCoin.png'
import { GoldCoinHelp } from './help/GoldCoinHelp'

class GoldCoinDescription extends TokenDescription {
  width = 2.58
  height = 2.5
  image = GoldCoin
  help = GoldCoinHelp
}

export const goldCoinDescription = new GoldCoinDescription()
