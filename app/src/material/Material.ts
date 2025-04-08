import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { enhancementTileDescription } from './EnhancementTileDescription'
import { firstPlayerMarkerDescription } from './FirstPlayerMarkerDescription'
import { gameBoardDescription } from './GameBoardDescription'
import { gardenCardDescription } from './GardenCardDescription'
import { gardenerDescription } from './GardenerDescription'
import { goldCoinDescription } from './GoldCoinDescription'
import { irrigationCardDescription } from './IrrigationCardDescription'
import { miniBoardDescription } from './MiniBoardDescription'
import { objectiveMarkerDescription } from './ObjectiveMarkerDescription'
import { objectiveTileDescription } from './ObjectiveTileDescription'
import { scorePadDescription } from './ScorePadDescription'
import { toolDescription } from './ToolDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.GameBoard]: gameBoardDescription,
  [MaterialType.MiniBoard]: miniBoardDescription,
  [MaterialType.GardenCard]: gardenCardDescription,
  [MaterialType.EnhancementTile]: enhancementTileDescription,
  [MaterialType.ObjectiveTile]: objectiveTileDescription,
  [MaterialType.IrrigationCard]: irrigationCardDescription,
  [MaterialType.Gardener]: gardenerDescription,
  [MaterialType.ObjectiveMarker]: objectiveMarkerDescription,
  [MaterialType.FirstPlayerMarker]: firstPlayerMarkerDescription,
  [MaterialType.GoldCoin]: goldCoinDescription,
  [MaterialType.Tool]: toolDescription,
  [MaterialType.ScorePad]: scorePadDescription
}
