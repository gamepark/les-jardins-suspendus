import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { enhancementPileLocator } from './EnhancementPileLocator'
import { firstPlayerMarkerPlaceLocator } from './FirstPlayerMarkerPlaceLocator'
import { gardenCardsDeckLocator } from './GardenCardsDeckLocator'
import { mainBoardSpaceLocator } from './MainBoardSpaceLocator'
import { miniBoardPlaceLocator } from './MiniBoardPlaceLocator'
import { objectiveTileSpaceLocator } from './ObjectiveTileSpaceLocator'
import { playerGardenersLocator } from './PlayerGardenersLocator'
import { playerIrrigationCardLocator } from './PlayerIrrigationCardLocator'
import { playerObjectiveMarkersLocator } from './PlayerObjectiveMarkersLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.MiniBoardPlace]: miniBoardPlaceLocator,
  [LocationType.GardenCardsDeck]: gardenCardsDeckLocator,
  [LocationType.MainBoardSpace]: mainBoardSpaceLocator,
  [LocationType.EnhancementPile]: enhancementPileLocator,
  [LocationType.ObjectiveTileSpace]: objectiveTileSpaceLocator,
  [LocationType.PlayerIrrigationCard]: playerIrrigationCardLocator,
  [LocationType.PlayerGardeners]: playerGardenersLocator,
  [LocationType.PlayerObjectiveMarkers]: playerObjectiveMarkersLocator,
  [LocationType.FirstPlayerMarkerPlace]: firstPlayerMarkerPlaceLocator
}
