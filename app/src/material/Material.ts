import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { gameBoardDescription } from './GameBoardDescription'
import { miniBoardDescription } from './MiniBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.GameBoard]: gameBoardDescription,
  [MaterialType.MiniBoard]: miniBoardDescription
}
