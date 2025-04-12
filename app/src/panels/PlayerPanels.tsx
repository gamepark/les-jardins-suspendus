/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { MaterialContext, StyledPlayerPanel, useMaterialContext, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import GoldCoin from '../images/GoldCoin.png'
import Tool from '../images/Tool.png'
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
            image: Tool,
            value: rules.material(MaterialType.Tool).player(player.id).getQuantity()
          },
          {
            image: GoldCoin,
            value: rules.material(MaterialType.GoldCoin).player(player.id).getQuantity()
          }
        ]
        return (
          <StyledPlayerPanel
            key={player.id}
            player={player}
            css={[panelCss, getPanelPosition(context, player.id), getPanelBackground(player.id)]}
            counters={counters}
          />
        )
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
  const topMax = is5Players ? 69.8 : 68
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

const getPanelBackground = (player: PlayerColor) => css`
  background: ${playerBackground[player][0]};
  background: linear-gradient(90deg, ${playerBackground[player][0]} 0%, ${playerBackground[player][1]} 100%);
`

const playerBackground: Record<PlayerColor, [string, string]> = {
  [PlayerColor.Grey]: ['#737f89', '#96a4b1'],
  [PlayerColor.Red]: ['#801416', '#c5403b'],
  [PlayerColor.Purple]: ['#58449a', '#6e62ac'],
  [PlayerColor.Beige]: ['#eee5a3', '#f3f1b1'],
  [PlayerColor.Blue]: ['#3ba1c8', '#4dc3f0']
}
