/** @jsxImportSource @emotion/react */
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { CustomMoveType } from '@gamepark/les-jardins-suspendus/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const CompleteObjectiveHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<LesJardinsSuspendusRules>()!
  const me = usePlayerId<PlayerColor>()
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  if (activePlayer === me) {
    return (
      <Trans
        defaults="header.objective.you"
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  } else {
    return <>{t('header.objective.player', { player })}</>
  }
}
