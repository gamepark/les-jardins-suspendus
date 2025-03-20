/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { gameBoardDescription } from './material/GameBoardDescription'
import { miniBoardDescription } from './material/MiniBoardDescription'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  return (
    <>
      <GameTable
        xMin={-40}
        xMax={40}
        yMin={-gameBoardDescription.height / 2 - 1}
        yMax={gameBoardDescription.height / 2 + miniBoardDescription.height + 1}
        css={process.env.NODE_ENV === 'development' && tableBorder}
      >
        <GameTableNavigation />
        <PlayerPanels />
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
