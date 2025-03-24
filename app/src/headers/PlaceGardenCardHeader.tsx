/** @jsxImportSource @emotion/react */
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const PlaceGardenCardHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<LesJardinsSuspendusRules>()!
  const me = usePlayerId<PlayerColor>()
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  if (activePlayer === me) {
    return <>{t('header.garden.you')}</>
  } else {
    return <>{t('header.garden.player', { player })}</>
  }
}
