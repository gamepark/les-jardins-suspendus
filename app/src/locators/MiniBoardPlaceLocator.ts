import { Locator } from '@gamepark/react-game'
import { gameBoardDescription } from '../material/GameBoardDescription'
import { miniBoardDescription } from '../material/MiniBoardDescription'

class MiniBoardPlaceLocator extends Locator {
  coordinates = { y: gameBoardDescription.height / 2 + miniBoardDescription.height / 2 }
}

export const miniBoardPlaceLocator = new MiniBoardPlaceLocator()
