import { Automaton } from '@gamepark/les-jardins-suspendus/material/Automaton'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '../../../../rules-api'
import Automaton1 from '../images/cards/automaton/Automaton1.jpg'
import Automaton10 from '../images/cards/automaton/Automaton10.jpg'
import Automaton11 from '../images/cards/automaton/Automaton11.jpg'
import Automaton12 from '../images/cards/automaton/Automaton12.jpg'
import Automaton13 from '../images/cards/automaton/Automaton13.jpg'
import Automaton14 from '../images/cards/automaton/Automaton14.jpg'
import Automaton15 from '../images/cards/automaton/Automaton15.jpg'
import Automaton16 from '../images/cards/automaton/Automaton16.jpg'
import Automaton17 from '../images/cards/automaton/Automaton17.jpg'
import Automaton18 from '../images/cards/automaton/Automaton18.jpg'
import Automaton2 from '../images/cards/automaton/Automaton2.jpg'
import Automaton3 from '../images/cards/automaton/Automaton3.jpg'
import Automaton4 from '../images/cards/automaton/Automaton4.jpg'
import Automaton5 from '../images/cards/automaton/Automaton5.jpg'
import Automaton6 from '../images/cards/automaton/Automaton6.jpg'
import Automaton7 from '../images/cards/automaton/Automaton7.jpg'
import Automaton8 from '../images/cards/automaton/Automaton8.jpg'
import Automaton9 from '../images/cards/automaton/Automaton9.jpg'
import AutomatonBack from '../images/cards/automaton/AutomatonBack.jpg'

class AutomatonCardDescription extends CardDescription {
  width = 6
  height = 6

  images = {
    [Automaton.Automaton1]: Automaton1,
    [Automaton.Automaton2]: Automaton2,
    [Automaton.Automaton3]: Automaton3,
    [Automaton.Automaton4]: Automaton4,
    [Automaton.Automaton5]: Automaton5,
    [Automaton.Automaton6]: Automaton6,
    [Automaton.Automaton7]: Automaton7,
    [Automaton.Automaton8]: Automaton8,
    [Automaton.Automaton9]: Automaton9,
    [Automaton.Automaton10]: Automaton10,
    [Automaton.Automaton11]: Automaton11,
    [Automaton.Automaton12]: Automaton12,
    [Automaton.Automaton13]: Automaton13,
    [Automaton.Automaton14]: Automaton14,
    [Automaton.Automaton15]: Automaton15,
    [Automaton.Automaton16]: Automaton16,
    [Automaton.Automaton17]: Automaton17,
    [Automaton.Automaton18]: Automaton18
  }

  backImage = AutomatonBack

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.type === LocationType.AutomatonDeck
  }
}

export const automatonCardDescription = new AutomatonCardDescription()
