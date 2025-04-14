import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import GameBoard1To3Players from '../images/boards/GameBoard1To3Players.jpg'
import GameBoard4To5Players from '../images/boards/GameBoard4To5Players.jpg'
import { GameBoardHelp } from './help/GameBoardHelp'

class GameBoardDescription extends BoardDescription {
  width = 24.5
  height = 49
  images = {
    [1]: GameBoard1To3Players,
    [4]: GameBoard4To5Players
  }

  getStaticItems(context: MaterialContext) {
    return [{ id: this.getBoardId(context), location: { type: LocationType.GameBoardPlace } }]
  }

  getBoardId({ rules: { players } }: MaterialContext) {
    return players.length <= 3 ? 1 : 4
  }

  help = GameBoardHelp
}

export const gameBoardDescription = new GameBoardDescription()
