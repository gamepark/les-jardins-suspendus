/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { Objective } from '@gamepark/les-jardins-suspendus/material/Objective'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { linkButtonCss, MaterialComponent, MaterialHelpProps, PlayMoveButton, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const ObjectiveTileHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const objective = item.id as Objective
  const rules = useRules<LesJardinsSuspendusRules>()!
  const player = usePlayerId<PlayerColor>()
  const firstPlayerMarker = rules.material(MaterialType.FirstPlayerMarker)
  const displayFirstPlayerMarkerHelp = displayMaterialHelp(MaterialType.FirstPlayerMarker, firstPlayerMarker.getItem(), firstPlayerMarker.getIndex())
  const objectiveMarker = rules.material(MaterialType.ObjectiveMarker).player(player ?? rules.players[0])
  const displayObjectiveMarkerHelp = displayMaterialHelp(MaterialType.ObjectiveMarker, objectiveMarker.getItem(), objectiveMarker.getIndex())
  return (
    <>
      <h2>{t('objective')}</h2>
      <p>{t(`objective.${objective}`)}</p>
      <p>
        <Trans
          defaults="objective.complete"
          components={{
            bold: <strong />
          }}
        />
      </p>
      <p>
        <Trans
          defaults="objective.discount"
          components={{
            marker: <PlayMoveButton css={linkButtonCss} move={displayFirstPlayerMarkerHelp} transient />,
            objective: <strong />
          }}
        />
      </p>
      <p>
        <Trans
          defaults="objective.mark"
          components={{
            objective: <strong />,
            marker: <PlayMoveButton css={linkButtonCss} move={displayObjectiveMarkerHelp} transient />
          }}
        />
      </p>
      <p>
        <Trans
          defaults="objective.bonus"
          components={{
            tool: <MaterialComponent type={MaterialType.Tool} css={iconCss} />,
            gold: <MaterialComponent type={MaterialType.GoldCoin} css={iconCss} />
          }}
        />
      </p>
    </>
  )
}

const iconCss = css`
  display: inline-block;
  vertical-align: sub;
  font-size: 0.5em;
`
