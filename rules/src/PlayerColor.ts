import { getEnumValues } from '@gamepark/rules-api'

export enum PlayerColor {
  Grey = 1,
  Red,
  Purple,
  Beige,
  Blue
}

export const playerColors = getEnumValues(PlayerColor)
