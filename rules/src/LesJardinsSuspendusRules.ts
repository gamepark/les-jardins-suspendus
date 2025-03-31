import {
  CompetitiveScore,
  getEnumValues,
  HiddenMaterialRules,
  hideItemId,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { sumBy } from 'lodash'
import { EnhancementId, enhancementsAnatomy } from './material/Enhancement'
import { Flower, Garden, gardensAnatomy } from './material/Garden'
import { IrrigationPattern, irrigationPatterns, irrigationScore } from './material/IrrigationPattern'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { BuyEnhancementRule } from './rules/BuyEnhancementRule'
import { CompleteObjectiveRule } from './rules/CompleteObjectiveRule'
import { EndOfRoundRule } from './rules/EndOfRoundRule'
import { PlaceGardenCardRule } from './rules/PlaceGardenCardRule'
import { RevealNewGardenCardRule } from './rules/RevealNewGardenCardRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class LesJardinsSuspendusRules
  extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType>
  implements
    CompetitiveScore<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>,
    TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  rules = {
    [RuleId.PlaceGardenCard]: PlaceGardenCardRule,
    [RuleId.BuyEnhancement]: BuyEnhancementRule,
    [RuleId.CompleteObjective]: CompleteObjectiveRule,
    [RuleId.RevealNewGardenCard]: RevealNewGardenCardRule,
    [RuleId.EndOfRound]: EndOfRoundRule
  }

  locationsStrategies = {
    [MaterialType.GardenCard]: {
      [LocationType.GardenCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.MainBoardSpace]: new PositiveSequenceStrategy('y')
    },
    [MaterialType.EnhancementTile]: {
      [LocationType.EnhancementPile]: new PositiveSequenceStrategy()
    },
    [MaterialType.Gardener]: {
      [LocationType.GardenerSpace]: new PositiveSequenceStrategy()
    },
    [MaterialType.ObjectiveMarker]: {
      [LocationType.ObjectiveSpace]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.GardenCard]: {
      [LocationType.GardenCardsDeck]: hideItemId
    },
    [MaterialType.EnhancementTile]: {
      [LocationType.EnhancementPile]: (item: MaterialItem) => (item.location.rotation ? ['id.front'] : [])
    }
  }

  getScore(player: PlayerColor) {
    return (
      this.scoreIrrigation(player) +
      sumBy(getEnumValues(Flower), (flower) => this.scoreBlooms(player, flower)) +
      this.scoreTrees(player) +
      this.scoreAnimals(player) +
      this.scoreVisitors(player) +
      this.scoreRoyalObjectives(player)
    )
  }

  scoreIrrigation(player: PlayerColor) {
    const pattern = irrigationPatterns[this.material(MaterialType.IrrigationCard).player(player).getItem<IrrigationPattern>()!.id]
    const garden = this.material(MaterialType.GardenCard).location(LocationType.PlayerGarden).player(player)
    const xMin = garden.minBy((item) => item.location.x!).getItem()!.location.x!
    const matches = pattern.reduce(
      (sum, patternLine, y) =>
        sum +
        patternLine.reduce((sum, patternMatch, x) => {
          if (!patternMatch) return sum
          const gardenCard = garden.location((l) => l.x === x + xMin && l.y === 2 - y)
          if (!gardenCard.length) return sum
          const gardenAnatomy = gardensAnatomy[gardenCard.getItem<Garden>()!.id]
          const enhancement = this.material(MaterialType.EnhancementTile)
            .parent(gardenCard.getIndex())
            .location(LocationType.EmptyGarden)
            .getItem<EnhancementId>()
          const irrigated = gardenAnatomy.irrigation === true || (enhancement && enhancementsAnatomy[enhancement.id.front!].irrigation)
          return sum + (irrigated ? 1 : 0)
        }, 0),
      0
    )
    return irrigationScore[matches]
  }

  scoreBlooms(_playerId: PlayerColor, _flower: Flower): number {
    return 0
  }

  scoreTrees(_playerId: PlayerColor): number {
    return 0
  }

  scoreAnimals(_playerId: PlayerColor): number {
    return 0
  }

  scoreVisitors(_playerId: PlayerColor): number {
    return 0
  }

  scoreRoyalObjectives(_playerId: PlayerColor): number {
    return 0
  }

  getTieBreaker(tieBreaker: number, player: PlayerColor) {
    if (tieBreaker === 1) {
      const gold = this.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldCoins).player(player).getQuantity()
      const tools = this.material(MaterialType.Tool).location(LocationType.PlayerTools).player(player).getQuantity()
      return gold + tools
    }
    return
  }

  giveTime(): number {
    return 60
  }
}
