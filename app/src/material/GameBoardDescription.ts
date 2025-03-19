import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import GameBoard1To3Players from '../images/boards/GameBoard1To3Players.jpg'
import GameBoard4To5Players from '../images/boards/GameBoard4To5Players.jpg'

class GameBoardDescription extends BoardDescription {
  width = 24.5
  height = 49
  image = GameBoard1To3Players
  backImage = GameBoard4To5Players
  staticItem = { location: { type: LocationType.GameBoardPlace } }

  isFlipped(_: Partial<MaterialItem>, context: MaterialContext) {
    return context.rules.players.length > 3
  }
}

export const gameBoardDescription = new GameBoardDescription()
