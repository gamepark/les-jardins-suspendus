/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { Avatar, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class ScoreSheetBoxDescription extends LocationDescription {
  height = 1
  width = 1

  extraCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `

  content = ScoreDisplay

  displayInParentItemHelp = true
}

const ScoreDisplay = ({ location }: { location: Location }) => {
  if (location.y === 0) {
    return <Avatar css={avatarStyle} playerId={location.player} />
  } else {
    return <span css={[scoreStyle, location.y === 9 && bold, color(location.player!)]}>{location.z}</span>
  }
}

const scoreStyle = css`
  width: 2em;
  text-align: right;
  font-size: 0.8em;
  color: black;
`

const bold = css`
  font-weight: bold;
`

const color = (player: PlayerColor) => css`
  color: ${playerColors[player]};
`

const playerColors: Record<PlayerColor, string> = {
  [PlayerColor.Grey]: '#131920',
  [PlayerColor.Red]: '#190002',
  [PlayerColor.Purple]: '#291a51',
  [PlayerColor.Beige]: '#716e50',
  [PlayerColor.Blue]: '#072938'
}

const avatarStyle = css`
  border-radius: 100%;
  height: 1em;
  width: 1em;
  color: black;
  box-shadow: 0 0 0.1em black;
`
