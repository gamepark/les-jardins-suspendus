import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'

export type PlayerLocation = {
  column: PlayerColumn
  line: PlayerLine
}

export enum PlayerColumn {
  Left = 1,
  Right
}

export enum PlayerLine {
  Bottom,
  Middle,
  Top
}

const topLeft: PlayerLocation = { column: PlayerColumn.Left, line: PlayerLine.Top }
const bottomLeft: PlayerLocation = { column: PlayerColumn.Left, line: PlayerLine.Bottom }
const topRight: PlayerLocation = { column: PlayerColumn.Right, line: PlayerLine.Top }
const middleRight: PlayerLocation = { column: PlayerColumn.Right, line: PlayerLine.Middle }
const bottomRight: PlayerLocation = { column: PlayerColumn.Right, line: PlayerLine.Bottom }

const locations5Players = [bottomLeft, topLeft, topRight, middleRight, bottomRight]
const locations4Players = [bottomLeft, topLeft, topRight, bottomRight]
const locations3Players = [bottomLeft, topRight, bottomRight]
const locations2Players = [bottomLeft, topLeft]

export function getPlayerLocation(context: MaterialContext, player: PlayerColor) {
  const index = getRelativePlayerIndex(context, player)
  switch (context.rules.players.length) {
    case 5:
      return locations5Players[index]
    case 4:
      return locations4Players[index]
    case 3:
      return locations3Players[index]
    case 2:
    default:
      return locations2Players[index]
  }
}
