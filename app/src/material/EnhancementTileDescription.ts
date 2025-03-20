import { Enhancement, EnhancementId, EnhancementType } from '@gamepark/les-jardins-suspendus/material/Enhancement'
import { ComponentSize, TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '../../../../rules-api'
import Cedar from '../images/tiles/enhancements/Cedar.png'
import CedarGold from '../images/tiles/enhancements/CedarGold.png'
import CedarTools from '../images/tiles/enhancements/CedarTools.png'
import DatePalm from '../images/tiles/enhancements/DatePalm.png'
import DatePalmIrrigation from '../images/tiles/enhancements/DatePalmIrrigation.png'
import DragonTree from '../images/tiles/enhancements/DragonTree.png'
import DragonTreeIrrigation from '../images/tiles/enhancements/DragonTreeIrrigation.png'
import EnhancementBonusBack from '../images/tiles/enhancements/EnhancementBonusBack.png'
import EnhancementIrrigationBack from '../images/tiles/enhancements/EnhancementIrrigationBack.png'
import EnhancementSimpleBack from '../images/tiles/enhancements/EnhancementSimpleBack.png'
import FlowerBB from '../images/tiles/enhancements/FlowerBB.png'
import FlowerBR from '../images/tiles/enhancements/FlowerBR.png'
import FlowerBRTools from '../images/tiles/enhancements/FlowerBRTools.png'
import FlowerBY from '../images/tiles/enhancements/FlowerBY.png'
import FlowerBYRCrown from '../images/tiles/enhancements/FlowerBYRCrown.png'
import FlowerBYRIrrigation from '../images/tiles/enhancements/FlowerBYRIrrigation.png'
import FlowerBYTools from '../images/tiles/enhancements/FlowerBYTools.png'
import FlowerRR from '../images/tiles/enhancements/FlowerRR.png'
import FlowerYR from '../images/tiles/enhancements/FlowerYR.png'
import FlowerYRTools from '../images/tiles/enhancements/FlowerYRTools.png'
import FlowerYY from '../images/tiles/enhancements/FlowerYY.png'
import Lion from '../images/tiles/enhancements/Lion.png'
import LionCrown from '../images/tiles/enhancements/LionCrown.png'
import Monkey from '../images/tiles/enhancements/Monkey.png'
import MonkeyCrown from '../images/tiles/enhancements/MonkeyCrown.png'
import MonkeyIrrigation from '../images/tiles/enhancements/MonkeyIrrigation.png'
import Peacock from '../images/tiles/enhancements/Peacock.png'
import PeacockIrrigation from '../images/tiles/enhancements/PeacockIrrigation.png'

class EnhancementTileDescription extends TokenDescription {
  images = {
    [Enhancement.Lion]: Lion,
    [Enhancement.Monkey]: Monkey,
    [Enhancement.Peacock]: Peacock,
    [Enhancement.DatePalm]: DatePalm,
    [Enhancement.Cedar]: Cedar,
    [Enhancement.DragonTree]: DragonTree,
    [Enhancement.FlowerBR]: FlowerBR,
    [Enhancement.FlowerBY]: FlowerBY,
    [Enhancement.FlowerYR]: FlowerYR,
    [Enhancement.FlowerBB]: FlowerBB,
    [Enhancement.FlowerYY]: FlowerYY,
    [Enhancement.FlowerRR]: FlowerRR,
    [Enhancement.LionCrown]: LionCrown,
    [Enhancement.MonkeyCrown]: MonkeyCrown,
    [Enhancement.CedarGold]: CedarGold,
    [Enhancement.CedarTools]: CedarTools,
    [Enhancement.FlowerBRTools]: FlowerBRTools,
    [Enhancement.FlowerBYTools]: FlowerBYTools,
    [Enhancement.FlowerYRTools]: FlowerYRTools,
    [Enhancement.FlowerBYRCrown]: FlowerBYRCrown,
    [Enhancement.MonkeyIrrigation]: MonkeyIrrigation,
    [Enhancement.PeacockIrrigation]: PeacockIrrigation,
    [Enhancement.DatePalmIrrigation]: DatePalmIrrigation,
    [Enhancement.DragonTreeIrrigation]: DragonTreeIrrigation,
    [Enhancement.FlowerBYRIrrigation]: FlowerBYRIrrigation
  }

  backImages = {
    [EnhancementType.Simple]: EnhancementSimpleBack,
    [EnhancementType.Bonus]: EnhancementBonusBack,
    [EnhancementType.Irrigation]: EnhancementIrrigationBack
  }

  getSize({ back }: EnhancementId): ComponentSize {
    return {
      width: 4.1,
      height: back === EnhancementType.Simple ? 3.75 : back === EnhancementType.Bonus ? 4.78 : 5.02
    }
  }

  isFlipped(item: Partial<MaterialItem>) {
    return item.location?.rotation === true
  }
}

export const enhancementTileDescription = new EnhancementTileDescription()
