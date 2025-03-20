import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { gameBoardDescription } from './GameBoardDescription'
import { gardenCardDescription } from './GardenCardDescription'
import { miniBoardDescription } from './MiniBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.GameBoard]: gameBoardDescription,
  [MaterialType.MiniBoard]: miniBoardDescription,
  [MaterialType.GardenCard]: gardenCardDescription
}
