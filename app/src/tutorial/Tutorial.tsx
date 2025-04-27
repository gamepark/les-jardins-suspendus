import { css } from '@emotion/react'
import { Enhancement, EnhancementId } from '@gamepark/les-jardins-suspendus/material/Enhancement'
import { Garden } from '@gamepark/les-jardins-suspendus/material/Garden'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { Objective } from '@gamepark/les-jardins-suspendus/material/Objective'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isCustomMove, isMoveItemType, MaterialGame, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { range } from 'lodash'
import { Trans } from 'react-i18next'
import CrownIcon from '../images/icons/CrownIcon.png'
import Irrigated from '../images/icons/Irrigated.jpg'
import { scorePadDescription } from '../material/ScorePadDescription'
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
    { move: { auto: true, filter: isCustomMove } },
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
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.bonus" components={BaseComponents} />,
        position: { x: -35, y: -10 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.GardenCard).id(Garden.EmptyBRTools), this.material(game, MaterialType.Tool).player(me)],
        margin: { right: 1 },
        scale: 0.6
      }),
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.gold" components={BaseComponents} />,
        position: { x: -30 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.GoldCoin).player(me)],
        margin: { top: 1, bottom: 1, right: 1, left: 20 },
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.enhance.cost" components={BaseComponents} />,
        position: { x: -30 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.EnhancementTile).rotation(false)],
        margin: { top: 1, bottom: 1, right: 1, left: 20 },
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.enhance.place" components={BaseComponents} />,
        position: { x: -30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.EnhancementTile).rotation(false),
          this.material(game, MaterialType.GardenCard).id(Garden.EmptyRYIrrigation),
          this.material(game, MaterialType.GardenCard).id(Garden.EmptyBRTools)
        ],
        margin: { top: 1, bottom: 1, right: 1 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.enhance.buy" components={BaseComponents} />,
        position: { x: -30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.EnhancementTile).id<EnhancementId>((id) => id.front === Enhancement.FlowerRR),
          this.material(game, MaterialType.GardenCard).id(Garden.EmptyRYIrrigation)
        ],
        margin: { top: 1, bottom: 1, right: 1 }
      }),
      move: {
        filter: (move, game) => this.isMoveEnhancementOnCard(Enhancement.FlowerRR, Garden.EmptyRYIrrigation, move, game)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.objective" components={BaseComponents} />,
        position: { x: 20, y: 20 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.ObjectiveTile)],
        margin: { top: 1, bottom: 1, right: 1 },
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.objective.flowers" components={BaseComponents} />,
        position: { x: 20, y: 20 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.ObjectiveTile).id(Objective.RedFlowers)],
        margin: { top: 1, bottom: 1, right: 1 },
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.objective.count" components={BaseComponents} />,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.GardenCard).id(Garden.EmptyRYIrrigation),
          this.material(game, MaterialType.EnhancementTile).id<EnhancementId>((id) => id.front === Enhancement.FlowerRR)
        ],
        margin: { top: 1, bottom: 1, right: 1 },
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.objective.reduce" components={BaseComponents} />,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FirstPlayerMarker),
          this.material(game, MaterialType.GardenCard).id(Garden.EmptyRYIrrigation),
          this.material(game, MaterialType.EnhancementTile).id<EnhancementId>((id) => id.front === Enhancement.FlowerRR)
        ],
        margin: { top: 1, bottom: 1, right: 1 },
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.objective.complete" components={BaseComponents} />,
        position: { x: 20, y: 20 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.ObjectiveTile).id(Objective.RedFlowers)],
        locations: [{ type: LocationType.ObjectiveSpace, id: 3 }],
        margin: { top: 1, bottom: 1, right: 1 },
        scale: 0.7
      }),
      move: {
        filter: isMoveItemType(MaterialType.ObjectiveMarker)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.3" components={BaseComponents} />
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => this.isMoveCard(Garden.EmptyBYCrown, move, game)
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.opponent.crown"
            components={{
              ...BaseComponents,
              crown: <Picture src={CrownIcon} css={pictureCss} />
            }}
          />
        ),
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.FirstPlayerMarker), this.material(game, MaterialType.GardenCard).id(Garden.EmptyBYCrown)],
        margin: { top: 1, bottom: 15, right: 1 },
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round" components={BaseComponents} />,
        position: { x: -20 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Gardener)],
        margin: { top: 1, bottom: 15, right: 1 },
        scale: 0.6
      })
    },
    { move: { player: opponent } },
    { move: { player: opponent } },
    {
      popup: {
        text: () => <Trans defaults="first-player.round" components={BaseComponents} />,
        position: { y: 15 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.FirstPlayerMarker)],
        margin: { top: 1, bottom: 15, right: 1 },
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.end-game" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.score" components={BaseComponents} />
      },
      focus: () => ({
        staticItems: { [MaterialType.ScorePad]: [scorePadDescription.staticItem] },
        margin: { top: 1, bottom: 5, right: 1 },
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.complete" components={BaseComponents} />
      }
    }
  ]

  isMoveCard(card: Garden, move: MaterialMove, game: MaterialGame): move is MoveItem {
    return isMoveItemType(MaterialType.GardenCard)(move) && move.itemIndex === this.material(game, MaterialType.GardenCard).id(card).getIndex()
  }

  isMoveEnhancementOnCard(enhancement: Enhancement, card: Garden, move: MaterialMove, game: MaterialGame): move is MoveItem {
    return (
      isMoveItemType(MaterialType.EnhancementTile)(move) &&
      move.itemIndex ===
        this.material(game, MaterialType.EnhancementTile)
          .id<EnhancementId>((id) => id.front === enhancement)
          .getIndex() &&
      move.location.parent === this.material(game, MaterialType.GardenCard).id(card).getIndex()
    )
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
