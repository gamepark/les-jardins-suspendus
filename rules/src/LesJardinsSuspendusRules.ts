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
import { Flower } from './material/Garden'
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

  getScore(player: PlayerColor): number {
    return (
      this.scoreIrrigation(player) +
      sumBy(getEnumValues(Flower), (flower) => this.scoreBlooms(player, flower)) +
      this.scoreTrees(player) +
      this.scoreAnimals(player) +
      this.scoreVisitors(player) +
      this.scoreRoyalObjectives(player)
    )
  }

  scoreIrrigation(_playerId: PlayerColor): number {
    return 0
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
