/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { MaterialContext, StyledPlayerPanel, useMaterialContext, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import { getPlayerLocation, PlayerColumn } from '../locators/PlayerLocation'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>()
  const context = useMaterialContext()
  const root = document.getElementById('root')
  const rules = useRules<LesJardinsSuspendusRules>()!
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => {
        const counters = [
          {
            image: '',
            value: rules.getScore(player.id)
          }
        ]
        return <StyledPlayerPanel key={player.id} player={player} css={[panelCss, getPanelPosition(context, player.id)]} counters={counters} />
      })}
    </>,
    root
  )
}

const panelCss = css`
  position: absolute;
  width: 28em;
`

function getPanelPosition(context: MaterialContext, player: PlayerColor) {
  const { line, column } = getPlayerLocation(context, player)
  const is5Players = context.rules.players.length === 5
  const topMax = is5Players ? 70 : 68
  if (column === PlayerColumn.Left) {
    return leftPanel(topMax - line * (is5Players ? 28 : 29.7))
  } else {
    return rightPanel(topMax - line * (is5Players ? 30.75 : 29.7))
  }
}

const leftPanel = (top: number) => css`
  left: 1em;
  top: ${top}em;
`

const rightPanel = (top: number) => css`
  right: 1em;
  top: ${top}em;
`
