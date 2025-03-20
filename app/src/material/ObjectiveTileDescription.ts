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

class ObjectiveTileDescription extends TokenDescription {
  width = 4.92
  height = 1.62

  images = {
    [Objective.Irrigation]: Irrigation,
    [Objective.BlueFlowers]: BlueFlowers,
    [Objective.YellowFlowers]: YellowFlowers,
    [Objective.RedFlowers]: RedFlowers,
    [Objective.Trees]: Trees,
    [Objective.Animals]: Animals,
    [Objective.Visitors]: Visitors,
    [Objective.Crowns]: Crowns,
    [Objective.ToolsBonus]: ToolsBonus,
    [Objective.GoldBonus]: GoldBonus
  }
}

export const objectiveTileDescription = new ObjectiveTileDescription()
