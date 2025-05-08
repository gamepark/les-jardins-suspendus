import { isMoveItemType, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { Automa, AutomaBonusAction, AutomaDiscard, automasAnatomy } from '../material/Automa'
import { Garden, gardensAnatomy, isAnimal, isTree, isVisitor } from '../material/Garden'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlaceGardenCardRule } from './PlaceGardenCardRule'
import { RevealNewGardenCardRule } from './RevealNewGardenCardRule'
import { RuleId } from './RuleId'

export class AutomaRule extends MaterialRulesPart {
  onRuleStart() {
    return [this.material(MaterialType.AutomaCard).location(LocationType.AutomaDeck).deck().dealOne({ type: LocationType.AutomaDiscard })]
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.AutomaCard)(move)) {
      const moves: MaterialMove[] = []
      const automa = this.material(MaterialType.AutomaCard).getItem<Automa>(move.itemIndex).id
      const anatomy = automasAnatomy[automa]
      const availableColumns = new PlaceGardenCardRule(this.game).availableColumns
      const column = anatomy.columns.find((column) => availableColumns.includes(column))!

      const gardeners = this.material(MaterialType.Gardener).location(LocationType.AutomaGardeners)
      moves.push(gardeners.moveItem({ type: LocationType.GardenerSpace, id: column }))

      const cardsToDiscard = this.getCardsToDiscard(column, anatomy.discard, anatomy.discardFallback)
      moves.push(...cardsToDiscard.moveItems({ type: LocationType.GardenCardsDiscard }))
      const gardenDeck = this.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).deck()
      moves.push(...gardenDeck.deal({ type: LocationType.GameBoardSpace, id: column }, cardsToDiscard.length))

      switch (anatomy.bonusAction) {
        case AutomaBonusAction.FirstPlayer: {
          const firstPlayerMarker = this.material(MaterialType.FirstPlayerMarker)
          if (firstPlayerMarker.getItem()!.location.player !== undefined) {
            moves.push(firstPlayerMarker.moveItem({ type: LocationType.FirstPlayerMarkerPlace }))
          }
          break
        }
        case AutomaBonusAction.Objective: {
          const markers = this.material(MaterialType.ObjectiveMarker).location(LocationType.AutomaObjectiveMarkers)
          const markersLeft = markers.getQuantity()
          if (markersLeft > 0) {
            moves.push(markers.moveItem({ type: LocationType.ObjectiveSpace, id: 5 - markersLeft }))
          }
          break
        }
        default: {
          const enhancementPile = this.material(MaterialType.EnhancementTile).location(LocationType.EnhancementPile).locationId(anatomy.bonusAction).deck()
          if (enhancementPile.length) {
            moves.push(enhancementPile.dealOne({ type: LocationType.EnhancementDiscard }))
            if (enhancementPile.length) {
              moves.push(enhancementPile.limit(1).rotateItem(false))
            }
          }
        }
      }

      moves.push(this.nextRule)

      return moves
    }
    return []
  }

  getCardsToDiscard(column: number, discard: AutomaDiscard, fallback = 1) {
    const columnCards = this.material(MaterialType.GardenCard)
      .location(LocationType.GameBoardSpace)
      .locationId(column)
      .sort((item) => item.location.y!)
    if (discard === AutomaDiscard.Flowers) {
      return columnCards.id<Garden>((id) => gardensAnatomy[id].flowers !== undefined)
    } else {
      const card = columnCards
        .id<Garden>((id) => {
          const anatomy = gardensAnatomy[id]
          switch (discard) {
            case AutomaDiscard.Animal:
              return isAnimal(anatomy.main)
            case AutomaDiscard.Tree:
              return isTree(anatomy.main)
            case AutomaDiscard.Visitor:
              return isVisitor(anatomy.main)
            case AutomaDiscard.Irrigation:
              return anatomy.irrigation === true
          }
        })
        .limit(1)
      if (card.length) {
        return card
      } else {
        return columnCards.location((location) => location.x === fallback - 1)
      }
    }
  }

  get nextRule() {
    const revealRule = new RevealNewGardenCardRule(this.game)
    if (revealRule.isEndOfRound) {
      if (revealRule.isGameOver) {
        return this.endGame()
      } else {
        return this.startRule(RuleId.EndOfRound)
      }
    } else {
      return this.startPlayerTurn(RuleId.PlaceGardenCard, this.game.players[0])
    }
  }
}
