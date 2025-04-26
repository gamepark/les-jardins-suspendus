import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { TutorialSetup } from './TutorialSetup'

const me = PlayerColor.Blue
const opponent = PlayerColor.Red

export class Tutorial extends MaterialTutorial {
  version = 1

  options = {
    players: [{ id: me }, { id: opponent }]
  }

  players = [{ id: me }, { id: opponent }]

  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.goal" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.cards" components={BaseComponents} />,
        position: { x: -25 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.GardenCard).location(LocationType.GameBoardSpace)],
        margin: { top: 1, bottom: 1, right: 1 }
      })
    }
  ]
}

const BaseComponents = {
  bold: <strong />,
  italic: <em />
}
