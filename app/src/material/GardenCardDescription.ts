import { GardenCard } from '@gamepark/les-jardins-suspendus/material/GardenCard'
import { CardDescription } from '@gamepark/react-game'
import CedarCrown from '../images/cards/gardens/CedarCrown.jpg'
import CedarGold from '../images/cards/gardens/CedarGold.jpg'
import CedarIrrigation from '../images/cards/gardens/CedarIrrigation.jpg'
import CedarTools from '../images/cards/gardens/CedarTools.jpg'
import DatePalm from '../images/cards/gardens/DatePalm.jpg'
import DragonTreeB from '../images/cards/gardens/DragonTreeB.jpg'
import DragonTreeIrrigation from '../images/cards/gardens/DragonTreeIrrigation.jpg'
import DragonTreeR from '../images/cards/gardens/DragonTreeR.jpg'
import DragonTreeY from '../images/cards/gardens/DragonTreeY.jpg'
import EmptyBBGold from '../images/cards/gardens/EmptyBBGold.jpg'
import EmptyBBTools from '../images/cards/gardens/EmptyBBTools.jpg'
import EmptyBCrownGold from '../images/cards/gardens/EmptyBCrownGold.jpg'
import EmptyBIrrigationCrown from '../images/cards/gardens/EmptyBIrrigationCrown.jpg'
import EmptyBIrrigationGold from '../images/cards/gardens/EmptyBIrrigationGold.jpg'
import EmptyBIrrigationTools from '../images/cards/gardens/EmptyBIrrigationTools.jpg'
import EmptyBRCrown from '../images/cards/gardens/EmptyBRCrown.jpg'
import EmptyBRGold from '../images/cards/gardens/EmptyBRGold.jpg'
import EmptyBRIrrigation from '../images/cards/gardens/EmptyBRIrrigation.jpg'
import EmptyBRTools from '../images/cards/gardens/EmptyBRTools.jpg'
import EmptyBRY from '../images/cards/gardens/EmptyBRY.jpg'
import EmptyBYCrown from '../images/cards/gardens/EmptyBYCrown.jpg'
import EmptyBYGold from '../images/cards/gardens/EmptyBYGold.jpg'
import EmptyBYIrrigation from '../images/cards/gardens/EmptyBYIrrigation.jpg'
import EmptyBYTools from '../images/cards/gardens/EmptyBYTools.jpg'
import EmptyRCrownGold from '../images/cards/gardens/EmptyRCrownGold.jpg'
import EmptyRIrrigationCrown from '../images/cards/gardens/EmptyRIrrigationCrown.jpg'
import EmptyRIrrigationGold from '../images/cards/gardens/EmptyRIrrigationGold.jpg'
import EmptyRIrrigationTools from '../images/cards/gardens/EmptyRIrrigationTools.jpg'
import EmptyRRGold from '../images/cards/gardens/EmptyRRGold.jpg'
import EmptyRRTools from '../images/cards/gardens/EmptyRRTools.jpg'
import EmptyRYIrrigation from '../images/cards/gardens/EmptyRYIrrigation.jpg'
import EmptyYCrownGold from '../images/cards/gardens/EmptyYCrownGold.jpg'
import EmptyYIrrigationCrown from '../images/cards/gardens/EmptyYIrrigationCrown.jpg'
import EmptyYIrrigationGold from '../images/cards/gardens/EmptyYIrrigationGold.jpg'
import EmptyYIrrigationTools from '../images/cards/gardens/EmptyYIrrigationTools.jpg'
import EmptyYRCrown from '../images/cards/gardens/EmptyYRCrown.jpg'
import EmptyYRGold from '../images/cards/gardens/EmptyYRGold.jpg'
import EmptyYRTools from '../images/cards/gardens/EmptyYRTools.jpg'
import EmptyYYGold from '../images/cards/gardens/EmptyYYGold.jpg'
import EmptyYYTools from '../images/cards/gardens/EmptyYYTools.jpg'
import GardenCardBack from '../images/cards/gardens/GardenCardBack.jpg'
import Lion from '../images/cards/gardens/Lion.jpg'
import LionIrrigation from '../images/cards/gardens/LionIrrigation.jpg'
import Monkey from '../images/cards/gardens/Monkey.jpg'
import MonkeyBR from '../images/cards/gardens/MonkeyBR.jpg'
import MonkeyBY from '../images/cards/gardens/MonkeyBY.jpg'
import MonkeyIrrigation from '../images/cards/gardens/MonkeyIrrigation.jpg'
import MonkeyRY from '../images/cards/gardens/MonkeyRY.jpg'
import Peacock from '../images/cards/gardens/Peacock.jpg'
import PeacockCrown from '../images/cards/gardens/PeacockCrown.jpg'
import PeacockGold from '../images/cards/gardens/PeacockGold.jpg'
import PeacockIrrigation from '../images/cards/gardens/PeacockIrrigation.jpg'
import PeacockTools from '../images/cards/gardens/PeacockTools.jpg'
import VisitorAnimalsCrown from '../images/cards/gardens/VisitorAnimalsCrown.jpg'
import VisitorBlueFlowersIrrigation from '../images/cards/gardens/VisitorBlueFlowersIrrigation.jpg'
import VisitorCrowns from '../images/cards/gardens/VisitorCrowns.jpg'
import VisitorEnhancementGold from '../images/cards/gardens/VisitorEnhancementGold.jpg'
import VisitorFlowers from '../images/cards/gardens/VisitorFlowers.jpg'
import VisitorGoldBonus from '../images/cards/gardens/VisitorGoldBonus.jpg'
import VisitorIrrigation from '../images/cards/gardens/VisitorIrrigation.jpg'
import VisitorObjectivesCrown from '../images/cards/gardens/VisitorObjectivesCrown.jpg'
import VisitorRedFlowersIrrigation from '../images/cards/gardens/VisitorRedFlowersIrrigation.jpg'
import VisitorToolsBonus from '../images/cards/gardens/VisitorToolsBonus.jpg'
import VisitorTreesCrown from '../images/cards/gardens/VisitorTreesCrown.jpg'
import VisitorTreeVisitorAnimal from '../images/cards/gardens/VisitorTreeVisitorAnimal.jpg'
import VisitorVisitorsIrrigation from '../images/cards/gardens/VisitorVisitorsIrrigation.jpg'
import VisitorYellowFlowersIrrigation from '../images/cards/gardens/VisitorYellowFlowersIrrigation.jpg'

class GardenCardDescription extends CardDescription {
  width = 6
  height = 6

  images = {
    [GardenCard.LionIrrigation]: LionIrrigation,
    [GardenCard.Lion]: Lion,
    [GardenCard.MonkeyIrrigation]: MonkeyIrrigation,
    [GardenCard.MonkeyBY]: MonkeyBY,
    [GardenCard.MonkeyRY]: MonkeyRY,
    [GardenCard.MonkeyBR]: MonkeyBR,
    [GardenCard.Monkey]: Monkey,
    [GardenCard.PeacockIrrigation]: PeacockIrrigation,
    [GardenCard.PeacockCrown]: PeacockCrown,
    [GardenCard.PeacockGold]: PeacockGold,
    [GardenCard.PeacockTools]: PeacockTools,
    [GardenCard.Peacock]: Peacock,
    [GardenCard.DatePalm]: DatePalm,
    [GardenCard.CedarIrrigation]: CedarIrrigation,
    [GardenCard.CedarCrown]: CedarCrown,
    [GardenCard.CedarTools]: CedarTools,
    [GardenCard.CedarGold]: CedarGold,
    [GardenCard.DragonTreeIrrigation]: DragonTreeIrrigation,
    [GardenCard.DragonTreeB]: DragonTreeB,
    [GardenCard.DragonTreeY]: DragonTreeY,
    [GardenCard.DragonTreeR]: DragonTreeR,
    [GardenCard.EmptyBRY]: EmptyBRY,
    [GardenCard.EmptyBRCrown]: EmptyBRCrown,
    [GardenCard.EmptyBYCrown]: EmptyBYCrown,
    [GardenCard.EmptyYRCrown]: EmptyYRCrown,
    [GardenCard.EmptyBRTools]: EmptyBRTools,
    [GardenCard.EmptyBYTools]: EmptyBYTools,
    [GardenCard.EmptyYRTools]: EmptyYRTools,
    [GardenCard.EmptyBRGold]: EmptyBRGold,
    [GardenCard.EmptyBYGold]: EmptyBYGold,
    [GardenCard.EmptyYRGold]: EmptyYRGold,
    [GardenCard.EmptyRRGold]: EmptyRRGold,
    [GardenCard.EmptyBBGold]: EmptyBBGold,
    [GardenCard.EmptyYYGold]: EmptyYYGold,
    [GardenCard.EmptyYYTools]: EmptyYYTools,
    [GardenCard.EmptyBBTools]: EmptyBBTools,
    [GardenCard.EmptyRRTools]: EmptyRRTools,
    [GardenCard.EmptyBRIrrigation]: EmptyBRIrrigation,
    [GardenCard.EmptyBYIrrigation]: EmptyBYIrrigation,
    [GardenCard.EmptyRYIrrigation]: EmptyRYIrrigation,
    [GardenCard.EmptyBIrrigationCrown]: EmptyBIrrigationCrown,
    [GardenCard.EmptyYIrrigationCrown]: EmptyYIrrigationCrown,
    [GardenCard.EmptyRIrrigationCrown]: EmptyRIrrigationCrown,
    [GardenCard.EmptyBIrrigationGold]: EmptyBIrrigationGold,
    [GardenCard.EmptyYIrrigationGold]: EmptyYIrrigationGold,
    [GardenCard.EmptyRIrrigationGold]: EmptyRIrrigationGold,
    [GardenCard.EmptyBIrrigationTools]: EmptyBIrrigationTools,
    [GardenCard.EmptyYIrrigationTools]: EmptyYIrrigationTools,
    [GardenCard.EmptyRIrrigationTools]: EmptyRIrrigationTools,
    [GardenCard.EmptyBCrownGold]: EmptyBCrownGold,
    [GardenCard.EmptyYCrownGold]: EmptyYCrownGold,
    [GardenCard.EmptyRCrownGold]: EmptyRCrownGold,
    [GardenCard.VisitorBlueFlowersIrrigation]: VisitorBlueFlowersIrrigation,
    [GardenCard.VisitorYellowFlowersIrrigation]: VisitorYellowFlowersIrrigation,
    [GardenCard.VisitorRedFlowersIrrigation]: VisitorRedFlowersIrrigation,
    [GardenCard.VisitorIrrigation]: VisitorIrrigation,
    [GardenCard.VisitorCrowns]: VisitorCrowns,
    [GardenCard.VisitorFlowers]: VisitorFlowers,
    [GardenCard.VisitorVisitorsIrrigation]: VisitorVisitorsIrrigation,
    [GardenCard.VisitorObjectivesCrown]: VisitorObjectivesCrown,
    [GardenCard.VisitorAnimalsCrown]: VisitorAnimalsCrown,
    [GardenCard.VisitorTreesCrown]: VisitorTreesCrown,
    [GardenCard.VisitorGoldBonus]: VisitorGoldBonus,
    [GardenCard.VisitorEnhancementGold]: VisitorEnhancementGold,
    [GardenCard.VisitorTreeVisitorAnimal]: VisitorTreeVisitorAnimal,
    [GardenCard.VisitorToolsBonus]: VisitorToolsBonus
  }

  backImage = GardenCardBack
}

export const gardenCardDescription = new GardenCardDescription()
