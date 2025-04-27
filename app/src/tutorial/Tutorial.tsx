import { css } from '@emotion/react'
import { Garden } from '@gamepark/les-jardins-suspendus/material/Garden'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, MaterialGame, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { range } from 'lodash'
import { Trans } from 'react-i18next'
import Irrigated from '../images/icons/Irrigated.jpg'
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
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.turn" components={BaseComponents} />,
        position: { x: -25, y: -10 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.GardenCard).id(Garden.Lion)],
        locations: [{ type: LocationType.PlayerGarden, player: me, x: 0, y: 0 }],
        margin: { top: 1, bottom: 1, right: 1 },
        scale: 0.6
      }),
      move: {
        filter: (move, game) => this.isMoveCard(Garden.Lion, move, game),
        interrupt: isMoveItemType(MaterialType.Gardener)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.gardener" components={BaseComponents} />,
        position: { x: -35 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Gardener).player(me)],
        locations: range(0, 2).map((x) => ({ type: LocationType.GardenerSpace, id: 1, x })),
        margin: { top: 1, bottom: 1, right: 1 },
        scale: 0.6
      }),
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.gardener.space" components={BaseComponents} />,
        position: { x: -35 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Gardener).location(LocationType.GardenerSpace),
          this.material(game, MaterialType.GardenCard).location(LocationType.GameBoardSpace).locationId(1)
        ],
        locations: range(0, 2).map((x) => ({ type: LocationType.GardenerSpace, id: 1, x })),
        margin: { top: 1, bottom: 1, right: 1 },
        scale: 0.6
      })
    },
    { move: { auto: true } },
    { move: { auto: true } },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.1" components={BaseComponents} />
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => this.isMoveCard(Garden.DragonTreeY, move, game)
      }
    },
    { move: { player: opponent } },
    { move: { player: opponent } },
    {
      popup: {
        text: () => <Trans defaults="tuto.gardener.blocked" components={BaseComponents} />,
        position: { x: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Gardener).location(LocationType.GardenerSpace),
          this.material(game, MaterialType.GardenCard).location(LocationType.GameBoardSpace).locationId(1)
        ],
        margin: { top: 1, bottom: 1, right: 1 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.tools" components={BaseComponents} />,
        position: { x: -30 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Tool).player(me)],
        margin: { top: 1, bottom: 1, right: 1, left: 20 },
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tool.use" components={BaseComponents} />,
        position: { x: -30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.GardenCard)
            .location(LocationType.GameBoardSpace)
            .location((l) => l.y !== 0)
        ],
        margin: { top: 1, bottom: 1, right: 1, left: 20 },
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.tools.pay" components={BaseComponents} />,
        position: { x: -30 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.GardenCard).id(Garden.EmptyRYIrrigation)],
        locations: [{ type: LocationType.PlayerGarden, player: me, x: 1, y: 0 }],
        margin: { top: 1, bottom: 1, right: 1, left: 20 },
        scale: 0.6
      }),
      move: {
        filter: (move, game) => this.isMoveCard(Garden.EmptyRYIrrigation, move, game) && move.location.x === 1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.vp" components={BaseComponents} />
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.GardenCard).id(Garden.Lion)],
        margin: { top: 1, bottom: 1, right: 1, left: 20 },
        scale: 0.6
      })
    },
    { move: { auto: true } },
    { move: { auto: true } },
    {
      move: {
        player: opponent,
        filter: (move, game) => this.isMoveCard(Garden.DragonTreeIrrigation, move, game)
      }
    },
    { move: { player: opponent } },
    { move: { player: opponent } },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.2" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.garden" components={BaseComponents} />,
        position: { y: -20 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.IrrigationCard).player(me)],
        margin: { bottom: 1 }
      })
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.irrigation"
            components={{
              ...BaseComponents,
              irrigated: <Picture src={Irrigated} css={pictureCss} />
            }}
          />
        ),
        position: { y: -20 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.IrrigationCard).player(me), this.material(game, MaterialType.GardenCard).id(Garden.EmptyRYIrrigation)],
        margin: { bottom: 1 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.floor2" components={BaseComponents} />,
        position: { y: -20 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.GardenCard).id(Garden.EmptyBRTools)],
        locations: [{ type: LocationType.PlayerGarden, player: me, x: 0, y: 1 }],
        margin: { right: 1 },
        scale: 0.6
      }),
      move: {
        filter: (move, game) => this.isMoveCard(Garden.EmptyBRTools, move, game) && move.location.y === 1,
        interrupt: isMoveItemType(MaterialType.Tool)
      }
    }
  ]

  isMoveCard(card: Garden, move: MaterialMove, game: MaterialGame): move is MoveItem {
    return isMoveItemType(MaterialType.GardenCard)(move) && move.itemIndex === this.material(game, MaterialType.GardenCard).id(card).getIndex()
  }
}

const BaseComponents = {
  bold: <strong />,
  italic: <em />
}

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.5em;
`
