import { CustomMove, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { range, sumBy } from 'es-toolkit/compat'
import { EnhancementId, enhancementsAnatomy } from '../material/Enhancement'
import { Flower, Garden, GardenAnatomy, gardensAnatomy, isAnimal, isTree, isVisitor } from '../material/Garden'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getObjectiveRequiredAmount, Objective } from '../material/Objective'
import { ObjectiveSpace } from '../material/ObjectiveSpace'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class CompleteObjectiveRule extends PlayerTurnRule {
  getPlayerMoves() {
    const markers = this.material(MaterialType.ObjectiveMarker).location(LocationType.PlayerObjectiveMarkers).id(this.player)
    return [
      ...this.objectivesICanComplete.map((tile) => markers.moveItem({ type: LocationType.ObjectiveSpace, id: tile.location.id })),
      this.customMove(CustomMoveType.Pass)
    ]
  }

  get objectivesICanComplete() {
    const objectiveTiles = this.material(MaterialType.ObjectiveTile).getItems<Objective>()
    const markers = this.material(MaterialType.ObjectiveMarker).location(LocationType.ObjectiveSpace).id(this.player).getItems()
    return objectiveTiles.filter((tile) => !markers.some((marker) => marker.location.id === tile.location.id) && this.canComplete(tile.id))
  }

  canComplete(objective: Objective) {
    return this.countMaxItemsOnSameLine(objective) >= this.getPlayerRequiredAmount(objective)
  }

  getPlayerRequiredAmount(objective: Objective) {
    const amount = getObjectiveRequiredAmount(objective)
    const hasFirstPlayerMarker = this.material(MaterialType.FirstPlayerMarker).getItem()?.location.player === this.player
    return hasFirstPlayerMarker ? amount - 1 : amount
  }

  countMaxItemsOnSameLine(objective: Objective) {
    return Math.max(...range(0, 3).map((line) => this.countItemsOnLine(objective, line)))
  }

  countItemsOnLine(objective: Objective, line: number) {
    const cards = this.material(MaterialType.GardenCard)
      .location(LocationType.PlayerGarden)
      .player(this.player)
      .location((l) => l.y === line)
    return sumBy(cards.entries, ([index, card]) => {
      const enhancement = this.material(MaterialType.EnhancementTile).parent(index).location(LocationType.EmptyGarden).getItem<EnhancementId>()?.id.front
      return this.countItemsInGarden(objective, gardensAnatomy[card.id as Garden], enhancement ? enhancementsAnatomy[enhancement] : {})
    })
  }

  countItemsInGarden(objective: Objective, garden: GardenAnatomy, enhancement: GardenAnatomy) {
    switch (objective) {
      case Objective.Irrigation:
        return garden.irrigation || enhancement.irrigation ? 1 : 0
      case Objective.BlueFlowers:
        return this.countFlowersInGarden(Flower.Blue, garden, enhancement)
      case Objective.YellowFlowers:
        return this.countFlowersInGarden(Flower.Yellow, garden, enhancement)
      case Objective.RedFlowers:
        return this.countFlowersInGarden(Flower.Red, garden, enhancement)
      case Objective.Animals:
        return isAnimal(garden.main) || isAnimal(enhancement.main) ? 1 : 0
      case Objective.Trees:
        return isTree(garden.main) || isTree(enhancement.main) ? 1 : 0
      case Objective.Visitors:
        return isVisitor(garden.main) ? 1 : 0
      case Objective.Crowns:
        return (garden.crown ? 1 : 0) + (enhancement.crown ? 1 : 0)
      case Objective.GoldBonus:
        return (garden.gold ? 1 : 0) + (enhancement.gold ? 1 : 0)
      case Objective.ToolsBonus:
        return (garden.tools ? 1 : 0) + (enhancement.tools ? 1 : 0)
    }
  }

  countFlowersInGarden(flower: Flower, garden: GardenAnatomy, enhancement: GardenAnatomy) {
    return sumBy(garden.flowers?.concat(enhancement.flowers ?? []), (f) => (f === flower ? 1 : 0))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.ObjectiveMarker)(move) && move.location.type === LocationType.ObjectiveSpace) {
      const moves: MaterialMove[] = []
      if (move.location.id === ObjectiveSpace.ToolScore2Or1) {
        const toolsStock = this.material(MaterialType.Tool).location(LocationType.ToolsStock)
        if (toolsStock.getQuantity() > 0) {
          moves.push(toolsStock.moveItem({ type: LocationType.PlayerTools, player: this.player }, 1))
        }
      } else if (move.location.id === ObjectiveSpace.GoldScore2Or1) {
        const goldStock = this.material(MaterialType.GoldCoin).location(LocationType.GoldCoinsStock)
        if (goldStock.getQuantity() > 0) {
          moves.push(goldStock.moveItem({ type: LocationType.PlayerGoldCoins, player: this.player }, 1))
        }
      }
      moves.push(this.startRule(RuleId.RevealNewGardenCard))
      return moves
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [this.startRule(RuleId.RevealNewGardenCard)]
    }
    return []
  }
}
