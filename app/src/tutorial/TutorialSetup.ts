import { LesJardinsSuspendusSetup } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusSetup'
import { Enhancement, EnhancementId, EnhancementType } from '@gamepark/les-jardins-suspendus/material/Enhancement'
import { Garden } from '@gamepark/les-jardins-suspendus/material/Garden'
import { IrrigationPattern } from '@gamepark/les-jardins-suspendus/material/IrrigationPattern'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { Objective } from '@gamepark/les-jardins-suspendus/material/Objective'
import { sample } from 'es-toolkit/compat'

export class TutorialSetup extends LesJardinsSuspendusSetup {
  dealGardenCards() {
    this.material(MaterialType.GardenCard).id(Garden.Lion).moveItem({ type: LocationType.GameBoardSpace, id: 1 })
    this.material(MaterialType.GardenCard).id(Garden.DragonTreeY).moveItem({ type: LocationType.GameBoardSpace, id: 1 })
    this.material(MaterialType.GardenCard).id(Garden.EmptyBYCrown).moveItem({ type: LocationType.GameBoardSpace, id: 2 })
    this.material(MaterialType.GardenCard).id(Garden.EmptyRYIrrigation).moveItem({ type: LocationType.GameBoardSpace, id: 2 })
    this.material(MaterialType.GardenCard).id(Garden.DragonTreeIrrigation).moveItem({ type: LocationType.GameBoardSpace, id: 3 })
    this.material(MaterialType.GardenCard).id(Garden.EmptyBRTools).moveItem({ type: LocationType.GameBoardSpace, id: 3 })
    const deck = this.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).deck()
    deck.deal({ type: LocationType.GameBoardSpace, id: 1 }, 2)
    deck.deal({ type: LocationType.GameBoardSpace, id: 2 }, 2)
    deck.deal({ type: LocationType.GameBoardSpace, id: 3 }, 2)
  }

  setupEnhancementTiles() {
    super.setupEnhancementTiles()
    this.material(MaterialType.EnhancementTile)
      .locationId(EnhancementType.Simple)
      .maxBy((item) => item.location.x!)
      .rotateItem(true)
    this.material(MaterialType.EnhancementTile)
      .id<EnhancementId>((id) => id.front === Enhancement.FlowerRR)
      .moveItem({ type: LocationType.EnhancementPile, id: EnhancementType.Simple, rotation: false })
  }

  setupObjectives() {
    super.setupObjectives()
    if (this.material(MaterialType.ObjectiveTile).id(Objective.RedFlowers).length === 0) {
      sample(this.material(MaterialType.ObjectiveTile).getItems())!.id = Objective.RedFlowers
    }
  }

  setupIrrigationCards() {
    this.material(MaterialType.IrrigationCard).createItem({
      id: IrrigationPattern.Center,
      location: {
        type: LocationType.PlayerIrrigationCard,
        player: this.players[0]
      }
    })
    this.material(MaterialType.IrrigationCard).createItem({
      id: IrrigationPattern.Borders,
      location: {
        type: LocationType.PlayerIrrigationCard,
        player: this.players[1]
      }
    })
  }
}
