import {
  CompetitiveScore,
  createAdjacentGroups,
  getEnumValues,
  HexGridSystem,
  HiddenMaterialRules,
  hideItemId,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { flatten, range, sum, sumBy, uniq } from 'lodash'
import { EnhancementId, enhancementsAnatomy } from './material/Enhancement'
import { Flower, Garden, GardenAnatomy, gardensAnatomy, isAnimal, isTree, isVisitor, MainSight, Tree, treeScore, Visitor } from './material/Garden'
import { IrrigationPattern, irrigationPatterns, irrigationScore } from './material/IrrigationPattern'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { AutomaRule } from './rules/AutomaRule'
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
    [RuleId.EndOfRound]: EndOfRoundRule,
    [RuleId.Automa]: AutomaRule
  }

  locationsStrategies = {
    [MaterialType.GardenCard]: {
      [LocationType.GardenCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.GameBoardSpace]: new PositiveSequenceStrategy('y'),
      [LocationType.GardenCardsDiscard]: new PositiveSequenceStrategy()
    },
    [MaterialType.EnhancementTile]: {
      [LocationType.EnhancementPile]: new PositiveSequenceStrategy(),
      [LocationType.EnhancementDiscard]: new PositiveSequenceStrategy()
    },
    [MaterialType.Gardener]: {
      [LocationType.GardenerSpace]: new PositiveSequenceStrategy()
    },
    [MaterialType.ObjectiveMarker]: {
      [LocationType.ObjectiveSpace]: new PositiveSequenceStrategy()
    },
    [MaterialType.AutomaCard]: {
      [LocationType.AutomaDeck]: new PositiveSequenceStrategy(),
      [LocationType.AutomaDiscard]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.GardenCard]: {
      [LocationType.GardenCardsDeck]: hideItemId
    },
    [MaterialType.EnhancementTile]: {
      [LocationType.EnhancementPile]: (item: MaterialItem) => (item.location.rotation ? ['id.front'] : [])
    },
    [MaterialType.AutomaCard]: {
      [LocationType.AutomaDeck]: hideItemId
    }
  }

  getScore(player: PlayerColor) {
    const anatomy = this.getPlayerGardenAnatomy(player)
    return (
      this.scoreIrrigation(player, anatomy) +
      sumBy(getEnumValues(Flower), (flower) => this.scoreBlooms(player, flower, anatomy)) +
      this.scoreTrees(player, anatomy) +
      this.scoreAnimals(player, anatomy) +
      this.scoreVisitors(player, anatomy) +
      this.scoreRoyalObjectives(player)
    )
  }

  getPlayerGardenAnatomy(player: PlayerColor): GardenAnatomy[][][] {
    const result: GardenAnatomy[][][] = range(0, 3).map((y) => range(0, 5 - y).map((_x) => []))
    const garden = this.material(MaterialType.GardenCard).location(LocationType.PlayerGarden).player(player)
    const xMin = garden.minBy((item) => item.location.x!).getItem()!.location.x!
    for (const [index, item] of garden.entries) {
      const x = item.location.x! - xMin
      const y = item.location.y!
      result[y][x].push(gardensAnatomy[item.id as Garden])
      const enhancement = this.material(MaterialType.EnhancementTile).parent(index).location(LocationType.EmptyGarden).getItem<EnhancementId>()
      if (enhancement) {
        result[y][x].push(enhancementsAnatomy[enhancement.id.front!])
      }
    }
    return result
  }

  scoreIrrigation(player: PlayerColor, anatomy = this.getPlayerGardenAnatomy(player)) {
    const pattern = irrigationPatterns[this.material(MaterialType.IrrigationCard).player(player).getItem<IrrigationPattern>()!.id]
    const matches = pattern.reduce(
      (sum, patternLine, y) =>
        sum +
        patternLine.reduce((sum, patternMatch, x) => {
          return patternMatch && anatomy[2 - y][x].some((anatomy) => anatomy.irrigation) ? sum + 1 : sum
        }, 0),
      0
    )
    return irrigationScore[matches]
  }

  scoreBlooms(player: PlayerColor, flower: Flower, anatomy = this.getPlayerGardenAnatomy(player)): number {
    const flowersMap = anatomy.map((line) => line.map((anatomies) => sumBy(anatomies, (anatomy) => sumBy(anatomy.flowers, (f) => (f === flower ? 1 : 0)))))
    const groups = uniq(flatten(createAdjacentGroups(flowersMap, { hexGridSystem: HexGridSystem.Axial })))
    return Math.max(...groups.map((group) => sum(group.values)))
  }

  scoreTrees(player: PlayerColor, anatomy = this.getPlayerGardenAnatomy(player)): number {
    return sumBy(getEnumValues(Tree), (tree) => {
      const treeMap = anatomy.map((line) => line.map((anatomies) => (anatomies.some((anatomy) => anatomy.main === tree) ? 1 : 0)))
      const groups = uniq(flatten(createAdjacentGroups(treeMap, { hexGridSystem: HexGridSystem.Axial })))
      const score = treeScore[tree]
      return sumBy(groups, (group) => {
        const size = group.values.length
        const completeGroups = Math.floor(size / score.length)
        const partialGroup = size % score.length
        return completeGroups * score[score.length - 1] + (partialGroup ? score[partialGroup - 1] : 0)
      })
    })
  }

  scoreAnimals(player: PlayerColor, anatomy = this.getPlayerGardenAnatomy(player)): number {
    return sumBy(range(0, 3), (y) => sumBy(anatomy[y], (anatomies) => anatomies.find((anatomy) => isAnimal(anatomy.main))?.animalScoring![y] ?? 0))
  }

  scoreVisitors(player: PlayerColor, anatomy = this.getPlayerGardenAnatomy(player)): number {
    return sumBy(
      flatten(anatomy)
        .map((anatomies) => anatomies[0]?.main)
        .filter(isVisitor),
      (visitor) => this.scoreVisitor(player, visitor, anatomy)
    )
  }

  scoreVisitor(player: PlayerColor, visitor: Visitor, anatomy = this.getPlayerGardenAnatomy(player)) {
    switch (visitor) {
      case Visitor.BlueFlowers:
        return this.countFlowers(Flower.Blue, anatomy)
      case Visitor.YellowFlowers:
        return this.countFlowers(Flower.Yellow, anatomy)
      case Visitor.RedFlowers:
        return this.countFlowers(Flower.Red, anatomy)
      case Visitor.Irrigation:
        return sumBy(anatomy, (line) => sumBy(line, (anatomies) => (anatomies.some((anatomy) => anatomy.irrigation) ? 1 : 0)))
      case Visitor.Animals:
        return this.countMainSight(anatomy, isAnimal)
      case Visitor.Visitors:
        return this.countMainSight(anatomy, isVisitor)
      case Visitor.Trees:
        return this.countMainSight(anatomy, isTree)
      case Visitor.Crowns:
        return sumBy(anatomy, (line) => sumBy(line, (anatomies) => sumBy(anatomies, (anatomy) => (anatomy.crown ? 1 : 0))))
      case Visitor.GoldBonus:
        return sumBy(anatomy, (line) => sumBy(line, (anatomies) => sumBy(anatomies, (anatomy) => (anatomy.gold ? 1 : 0))))
      case Visitor.ToolsBonus:
        return sumBy(anatomy, (line) => sumBy(line, (anatomies) => sumBy(anatomies, (anatomy) => (anatomy.tools ? 1 : 0))))
      case Visitor.Objectives:
        return this.material(MaterialType.ObjectiveMarker).id(player).location(LocationType.ObjectiveSpace).length * 2
      case Visitor.Enhancement:
        return sumBy(anatomy, (line) => sumBy(line, (anatomies) => (anatomies.length === 2 ? 1 : 0))) * 2
      case Visitor.Flowers:
        return Math.min(...getEnumValues(Flower).map((flower) => this.countFlowers(flower, anatomy))) * 2
      case Visitor.TreeVisitorAnimal:
        return Math.min(...[isAnimal, isVisitor, isTree].map((predicate) => this.countMainSight(anatomy, predicate))) * 3
    }
  }

  countFlowers(flower: Flower, anatomy: GardenAnatomy[][][]) {
    return sumBy(anatomy, (line) => sumBy(line, (anatomies) => sumBy(anatomies, (anatomy) => sumBy(anatomy.flowers, (f) => (f === flower ? 1 : 0)))))
  }

  countMainSight(anatomy: GardenAnatomy[][][], predicate: (main?: MainSight) => boolean) {
    return sumBy(anatomy, (line) => sumBy(line, (anatomies) => sumBy(anatomies, (anatomy) => (predicate(anatomy.main) ? 1 : 0))))
  }

  scoreRoyalObjectives(player: PlayerColor): number {
    const markers = this.material(MaterialType.ObjectiveMarker).id(player).location(LocationType.ObjectiveSpace).getItems()
    return sumBy(markers, (marker) => {
      const isBest = this.game.players.length > 3 ? marker.location.x! < 2 : marker.location.x === 0
      switch (marker.location.id) {
        case 1:
          return isBest ? 5 : 3
        case 2:
          return isBest ? 4 : 2
        default:
          return isBest ? 2 : 1
      }
    })
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
