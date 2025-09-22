import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { linkButtonCss, PlayMoveButton, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const FirstPlayerMarkerHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<LesJardinsSuspendusRules>()!
  const firstObjectiveTile = rules.material(MaterialType.ObjectiveTile).limit(1)
  const displayFirstObjectiveTileHelp = displayMaterialHelp(MaterialType.ObjectiveTile, firstObjectiveTile.getItem(), firstObjectiveTile.getIndex())
  return (
    <>
      <h2>{t('first-player')}</h2>
      <p>
        <Trans
          i18nKey="first-player.round"
          components={{
            bold: <strong />
          }}
        />
      </p>
      <p>
        <Trans
          i18nKey="objective.discount"
          components={{
            marker: <strong />,
            objective: <PlayMoveButton css={linkButtonCss} move={displayFirstObjectiveTileHelp} transient />
          }}
        />
      </p>
    </>
  )
}
