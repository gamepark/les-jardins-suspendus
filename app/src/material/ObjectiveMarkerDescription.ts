import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import BeigeMarker from '../images/markers/BeigeMarker.png'
import BlueMarker from '../images/markers/BlueMarker.png'
import GreyMarker from '../images/markers/GreyMarker.png'
import PurpleMarker from '../images/markers/PurpleMarker.png'
import RedMarker from '../images/markers/RedMarker.png'

class ObjectiveMarkerDescription extends TokenDescription {
  width = 1.9
  height = 1.9

  images = {
    [PlayerColor.Grey]: GreyMarker,
    [PlayerColor.Red]: RedMarker,
    [PlayerColor.Purple]: PurpleMarker,
    [PlayerColor.Beige]: BeigeMarker,
    [PlayerColor.Blue]: BlueMarker
  }
}

export const objectiveMarkerDescription = new ObjectiveMarkerDescription()
