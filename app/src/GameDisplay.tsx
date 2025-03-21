/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { gameBoardDescription } from './material/GameBoardDescription'
import { miniBoardDescription } from './material/MiniBoardDescription'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay = ({ players }: GameDisplayProps) => {
  return (
    <>
      <GameTable
        xMin={players === 5 ? -64 : -63}
        xMax={players === 5 ? 64 : 63}
        yMin={-gameBoardDescription.height / 2 - (players === 5 ? 4.5 : 1)}
        yMax={gameBoardDescription.height / 2 + miniBoardDescription.height + 1}
        css={process.env.NODE_ENV === 'development' && tableBorder}
      >
        <GameTableNavigation css={navigationCss} />
        <PlayerPanels />
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`

const navigationCss = css`
  top: 50em;
  left: 3em;
`
