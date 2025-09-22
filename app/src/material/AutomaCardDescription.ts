import { Automa } from '@gamepark/les-jardins-suspendus/material/Automa'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Automa1 from '../images/cards/automa/Automa1.jpg'
import Automa10 from '../images/cards/automa/Automa10.jpg'
import Automa11 from '../images/cards/automa/Automa11.jpg'
import Automa12 from '../images/cards/automa/Automa12.jpg'
import Automa13 from '../images/cards/automa/Automa13.jpg'
import Automa14 from '../images/cards/automa/Automa14.jpg'
import Automa15 from '../images/cards/automa/Automa15.jpg'
import Automa16 from '../images/cards/automa/Automa16.jpg'
import Automa17 from '../images/cards/automa/Automa17.jpg'
import Automa18 from '../images/cards/automa/Automa18.jpg'
import Automa2 from '../images/cards/automa/Automa2.jpg'
import Automa3 from '../images/cards/automa/Automa3.jpg'
import Automa4 from '../images/cards/automa/Automa4.jpg'
import Automa5 from '../images/cards/automa/Automa5.jpg'
import Automa6 from '../images/cards/automa/Automa6.jpg'
import Automa7 from '../images/cards/automa/Automa7.jpg'
import Automa8 from '../images/cards/automa/Automa8.jpg'
import Automa9 from '../images/cards/automa/Automa9.jpg'
import AutomaBack from '../images/cards/automa/AutomaBack.jpg'

class AutomaCardDescription extends CardDescription {
  width = 6
  height = 6

  images = {
    [Automa.Automa1]: Automa1,
    [Automa.Automa2]: Automa2,
    [Automa.Automa3]: Automa3,
    [Automa.Automa4]: Automa4,
    [Automa.Automa5]: Automa5,
    [Automa.Automa6]: Automa6,
    [Automa.Automa7]: Automa7,
    [Automa.Automa8]: Automa8,
    [Automa.Automa9]: Automa9,
    [Automa.Automa10]: Automa10,
    [Automa.Automa11]: Automa11,
    [Automa.Automa12]: Automa12,
    [Automa.Automa13]: Automa13,
    [Automa.Automa14]: Automa14,
    [Automa.Automa15]: Automa15,
    [Automa.Automa16]: Automa16,
    [Automa.Automa17]: Automa17,
    [Automa.Automa18]: Automa18
  }

  backImage = AutomaBack

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.type === LocationType.AutomaDeck
  }
}

export const automaCardDescription = new AutomaCardDescription()
