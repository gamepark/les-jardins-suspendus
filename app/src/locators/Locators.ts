import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { DeckLocator, ListLocator, Locator, PileLocator } from '@gamepark/react-game'
import { gameBoardDescription } from '../material/GameBoardDescription'
import { miniBoardDescription } from '../material/MiniBoardDescription'
import { emptyGardenLocator } from './EmptyGardenLocator'
import { enhancementPileLocator } from './EnhancementPileLocator'
import { firstPlayerMarkerPlaceLocator } from './FirstPlayerMarkerPlaceLocator'
import { gameBoardSpaceLocator } from './GameBoardSpaceLocator'
import { gardenerSpaceLocator } from './GardenerSpaceLocator'
import { objectiveSpaceLocator } from './ObjectiveSpaceLocator'
import { objectiveTileSpaceLocator } from './ObjectiveTileSpaceLocator'
import { playerGardenersLocator } from './PlayerGardenersLocator'
import { playerGardenLocator } from './PlayerGardenLocator'
import { playerGoldCoinsLocator } from './PlayerGoldCoinsLocator'
import { playerIrrigationCardLocator } from './PlayerIrrigationCardLocator'
import { playerObjectiveMarkersLocator } from './PlayerObjectiveMarkersLocator'
import { playerToolsLocator } from './PlayerToolsLocator'
import { scorePadBoxLocator } from './ScorePadBoxLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.MiniBoardPlace]: new Locator({ coordinates: { y: gameBoardDescription.height / 2 + miniBoardDescription.height / 2 } }),
  [LocationType.GardenCardsDeck]: new DeckLocator({ coordinates: { x: -20, y: miniBoardDescription.height / 2 }, navigationSorts: [] }),
  [LocationType.GameBoardSpace]: gameBoardSpaceLocator,
  [LocationType.EnhancementPile]: enhancementPileLocator,
  [LocationType.ObjectiveTileSpace]: objectiveTileSpaceLocator,
  [LocationType.PlayerIrrigationCard]: playerIrrigationCardLocator,
  [LocationType.PlayerGardeners]: playerGardenersLocator,
  [LocationType.PlayerObjectiveMarkers]: playerObjectiveMarkersLocator,
  [LocationType.FirstPlayerMarkerPlace]: firstPlayerMarkerPlaceLocator,
  [LocationType.GoldCoinsStock]: new PileLocator({ coordinates: { x: -40, y: miniBoardDescription.height / 2 }, radius: 3 }),
  [LocationType.PlayerGoldCoins]: playerGoldCoinsLocator,
  [LocationType.ToolsStock]: new PileLocator({ coordinates: { x: -30, y: miniBoardDescription.height / 2 }, radius: 3 }),
  [LocationType.PlayerTools]: playerToolsLocator,
  [LocationType.PlayerGarden]: playerGardenLocator,
  [LocationType.GardenerSpace]: gardenerSpaceLocator,
  [LocationType.EmptyGarden]: emptyGardenLocator,
  [LocationType.ObjectiveSpace]: objectiveSpaceLocator,
  [LocationType.ScorePadPlace]: new Locator({ coordinates: { x: -52, y: miniBoardDescription.height / 2 } }),
  [LocationType.ScorePadBox]: scorePadBoxLocator,
  [LocationType.AutomaDeck]: new DeckLocator({ coordinates: { x: -20, y: -15 }, navigationSorts: [] }),
  [LocationType.AutomaGardeners]: new ListLocator({ coordinates: { x: -22, y: -10 }, gap: { x: 2 } }),
  [LocationType.AutomaObjectiveMarkers]: new ListLocator({ coordinates: { x: -23, y: -7.5 }, gap: { x: 2 } }),
  [LocationType.AutomaDiscard]: new DeckLocator({ coordinates: { x: -28, y: -15 } }),
  [LocationType.GardenCardsDiscard]: new DeckLocator({ coordinates: { x: -36, y: -15 } }),
  [LocationType.EnhancementDiscard]: new PileLocator({ coordinates: { x: -44, y: -15 } })
}
