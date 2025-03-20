import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { enhancementTileDescription } from './EnhancementTileDescription'
import { gameBoardDescription } from './GameBoardDescription'
import { gardenCardDescription } from './GardenCardDescription'
import { irrigationCardDescription } from './IrrigationCardDescription'
import { miniBoardDescription } from './MiniBoardDescription'
import { objectiveTileDescription } from './ObjectiveTileDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.GameBoard]: gameBoardDescription,
  [MaterialType.MiniBoard]: miniBoardDescription,
  [MaterialType.GardenCard]: gardenCardDescription,
  [MaterialType.EnhancementTile]: enhancementTileDescription,
  [MaterialType.ObjectiveTile]: objectiveTileDescription,
  [MaterialType.IrrigationCard]: irrigationCardDescription
}
