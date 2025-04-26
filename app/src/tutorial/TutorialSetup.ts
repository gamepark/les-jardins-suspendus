import { LesJardinsSuspendusSetup } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusSetup'
import { Garden } from '@gamepark/les-jardins-suspendus/material/Garden'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'

export class TutorialSetup extends LesJardinsSuspendusSetup {
  dealGardenCards() {
    this.material(MaterialType.GardenCard).id(Garden.LionIrrigation).moveItem({ type: LocationType.GameBoardSpace, id: 1 })
    this.material(MaterialType.GardenCard).id(Garden.DragonTreeY).moveItem({ type: LocationType.GameBoardSpace, id: 1 })
    this.material(MaterialType.GardenCard).id(Garden.EmptyBYCrown).moveItem({ type: LocationType.GameBoardSpace, id: 2 })
    this.material(MaterialType.GardenCard).id(Garden.EmptyBRY).moveItem({ type: LocationType.GameBoardSpace, id: 2 })
    this.material(MaterialType.GardenCard).id(Garden.DragonTreeIrrigation).moveItem({ type: LocationType.GameBoardSpace, id: 3 })
    this.material(MaterialType.GardenCard).id(Garden.EmptyBIrrigationTools).moveItem({ type: LocationType.GameBoardSpace, id: 3 })
    const deck = this.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).deck()
    deck.deal({ type: LocationType.GameBoardSpace, id: 1 }, 2)
    deck.deal({ type: LocationType.GameBoardSpace, id: 2 }, 2)
    deck.deal({ type: LocationType.GameBoardSpace, id: 3 }, 2)
  }
}
