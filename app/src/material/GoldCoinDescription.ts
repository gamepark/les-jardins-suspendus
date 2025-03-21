import { TokenDescription } from '@gamepark/react-game'
import GoldCoin from '../images/GoldCoin.png'

class GoldCoinDescription extends TokenDescription {
  width = 2.58
  height = 2.5
  image = GoldCoin
}

export const goldCoinDescription = new GoldCoinDescription()
