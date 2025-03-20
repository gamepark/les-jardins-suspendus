import { TokenDescription } from '@gamepark/react-game'
import FirstPlayer from '../images/markers/FirstPlayer.png'

class FirstPlayerMarkerDescription extends TokenDescription {
  width = 5.05
  height = 6.4

  image = FirstPlayer
}

export const firstPlayerMarkerDescription = new FirstPlayerMarkerDescription()
