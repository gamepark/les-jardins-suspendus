import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import BeigeMarker from '../images/markers/BeigeMarker.png'
import BlueMarker from '../images/markers/BlueMarker.png'
import GreyMarker from '../images/markers/GreyMarker.png'
import PurpleMarker from '../images/markers/PurpleMarker.png'
import RedMarker from '../images/markers/RedMarker.png'
import { ObjectiveMarkerHelp } from './help/ObjectiveMarkerHelp'

class ObjectiveMarkerDescription extends TokenDescription {
  width = 2.1
  height = 2.1
  borderRadius = 1

  images = {
    [PlayerColor.Grey]: GreyMarker,
    [PlayerColor.Red]: RedMarker,
    [PlayerColor.Purple]: PurpleMarker,
    [PlayerColor.Beige]: BeigeMarker,
    [PlayerColor.Blue]: BlueMarker
  }

  help = ObjectiveMarkerHelp
}

export const objectiveMarkerDescription = new ObjectiveMarkerDescription()
