import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { miniBoardPlaceLocator } from './MiniBoardPlaceLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.MiniBoardPlace]: miniBoardPlaceLocator
}
