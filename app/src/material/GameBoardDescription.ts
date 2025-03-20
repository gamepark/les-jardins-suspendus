import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import GameBoard1To3Players from '../images/boards/GameBoard1To3Players.jpg'
import GameBoard4To5Players from '../images/boards/GameBoard4To5Players.jpg'

class GameBoardDescription extends BoardDescription {
  width = 24.5
  height = 49
  images = {
    [1]: GameBoard1To3Players,
    [2]: GameBoard1To3Players,
    [3]: GameBoard1To3Players,
    [4]: GameBoard4To5Players,
    [5]: GameBoard4To5Players
  }

  getStaticItems({ rules: { players } }: MaterialContext) {
    return [{ id: players.length, location: { type: LocationType.GameBoardPlace } }]
  }
}

export const gameBoardDescription = new GameBoardDescription()
