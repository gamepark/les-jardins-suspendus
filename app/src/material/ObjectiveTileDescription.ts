import { Objective } from '@gamepark/les-jardins-suspendus/material/Objective'
import { TokenDescription } from '@gamepark/react-game'
import Animals from '../images/tiles/objectives/Animals.png'
import BlueFlowers from '../images/tiles/objectives/BlueFlowers.png'
import Crowns from '../images/tiles/objectives/Crowns.png'
import GoldBonus from '../images/tiles/objectives/GoldBonus.png'
import Irrigation from '../images/tiles/objectives/Irrigation.png'
import RedFlowers from '../images/tiles/objectives/RedFlowers.png'
import ToolsBonus from '../images/tiles/objectives/ToolsBonus.png'
import Trees from '../images/tiles/objectives/Trees.png'
import Visitors from '../images/tiles/objectives/Visitors.png'
import YellowFlowers from '../images/tiles/objectives/YellowFlowers.png'
import { ObjectiveTileHelp } from './help/ObjectiveTileHelp'

class ObjectiveTileDescription extends TokenDescription {
  width = 4.92
  height = 1.62

  images = {
    [Objective.Animals]: Animals,
    [Objective.Trees]: Trees,
    [Objective.Irrigation]: Irrigation,
    [Objective.Visitors]: Visitors,
    [Objective.GoldBonus]: GoldBonus,
    [Objective.ToolsBonus]: ToolsBonus,
    [Objective.Crowns]: Crowns,
    [Objective.BlueFlowers]: BlueFlowers,
    [Objective.YellowFlowers]: YellowFlowers,
    [Objective.RedFlowers]: RedFlowers
  }

  transparency = true

  help = ObjectiveTileHelp
}

export const objectiveTileDescription = new ObjectiveTileDescription()
