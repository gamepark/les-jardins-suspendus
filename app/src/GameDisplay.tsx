/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  return (
    <>
      <GameTable xMin={-50} xMax={50} yMin={-30} yMax={40} css={process.env.NODE_ENV === 'development' && tableBorder}>
        <GameTableNavigation />
        <PlayerPanels />
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
