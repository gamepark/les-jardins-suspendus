import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { emptyGardenLocator } from './EmptyGardenLocator'
import { enhancementPileLocator } from './EnhancementPileLocator'
import { firstPlayerMarkerPlaceLocator } from './FirstPlayerMarkerPlaceLocator'
import { gardenCardsDeckLocator } from './GardenCardsDeckLocator'
import { gardenerSpaceLocator } from './GardenerSpaceLocator'
import { goldCoinsStockLocator } from './GoldCoinsStockLocator'
import { mainBoardSpaceLocator } from './MainBoardSpaceLocator'
import { miniBoardPlaceLocator } from './MiniBoardPlaceLocator'
import { objectiveTileSpaceLocator } from './ObjectiveTileSpaceLocator'
import { playerGardenersLocator } from './PlayerGardenersLocator'
import { playerGardenLocator } from './PlayerGardenLocator'
import { playerGoldCoinsLocator } from './PlayerGoldCoinsLocator'
import { playerIrrigationCardLocator } from './PlayerIrrigationCardLocator'
import { playerObjectiveMarkersLocator } from './PlayerObjectiveMarkersLocator'
import { playerToolsLocator } from './PlayerToolsLocator'
import { toolsStockLocator } from './ToolsStockLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.MiniBoardPlace]: miniBoardPlaceLocator,
  [LocationType.GardenCardsDeck]: gardenCardsDeckLocator,
  [LocationType.MainBoardSpace]: mainBoardSpaceLocator,
  [LocationType.EnhancementPile]: enhancementPileLocator,
  [LocationType.ObjectiveTileSpace]: objectiveTileSpaceLocator,
  [LocationType.PlayerIrrigationCard]: playerIrrigationCardLocator,
  [LocationType.PlayerGardeners]: playerGardenersLocator,
  [LocationType.PlayerObjectiveMarkers]: playerObjectiveMarkersLocator,
  [LocationType.FirstPlayerMarkerPlace]: firstPlayerMarkerPlaceLocator,
  [LocationType.GoldCoinsStock]: goldCoinsStockLocator,
  [LocationType.PlayerGoldCoins]: playerGoldCoinsLocator,
  [LocationType.ToolsStock]: toolsStockLocator,
  [LocationType.PlayerTools]: playerToolsLocator,
  [LocationType.PlayerGarden]: playerGardenLocator,
  [LocationType.GardenerSpace]: gardenerSpaceLocator,
  [LocationType.EmptyGarden]: emptyGardenLocator
}
