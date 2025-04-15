import { TokenDescription } from '@gamepark/react-game'
import FirstPlayer from '../images/markers/FirstPlayer.png'
import { FirstPlayerMarkerHelp } from './help/FirstPlayerMarkerHelp'

class FirstPlayerMarkerDescription extends TokenDescription {
  width = 5.05
  height = 6.4
  image = FirstPlayer
  help = FirstPlayerMarkerHelp
}

export const firstPlayerMarkerDescription = new FirstPlayerMarkerDescription()
