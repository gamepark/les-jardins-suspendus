import { css } from '@emotion/react'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { linkButtonCss, Picture, PlayMoveButton, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import AnimalIcon from '../../images/icons/Animal.png'
import BlueFlower from '../../images/icons/BlueFlower.png'
import Irrigation from '../../images/icons/Irrigation.png'
import RedFlower from '../../images/icons/RedFlower.png'
import TreeIcon from '../../images/icons/Tree.png'
import VisitorIcon from '../../images/icons/Visitor.png'
import ObjectiveIcon from '../../images/icons/Objective.png'
import YellowFlower from '../../images/icons/YellowFlower.png'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const ScorePadHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<LesJardinsSuspendusRules>()!
  const player = usePlayerId<PlayerColor>()
  const card = rules.material(MaterialType.IrrigationCard).player(player ?? rules.players[0])
  const displayIrrigationCardHelp = displayMaterialHelp(MaterialType.IrrigationCard, card.getItem(), card.getIndex())
  const firstObjectiveTile = rules.material(MaterialType.ObjectiveTile).limit(1)
  const displayFirstObjectiveTileHelp = displayMaterialHelp(MaterialType.ObjectiveTile, firstObjectiveTile.getItem(), firstObjectiveTile.getIndex())
  return (
    <>
      <h2>{t('scorepad')}</h2>
      <p>{t('scorepad.score')}</p>
      <p>
        <Trans
          i18nKey="scorepad.irrigation"
          components={{
            irrigation: <Picture src={Irrigation} css={pictureCss} />,
            card: <PlayMoveButton css={linkButtonCss} move={displayIrrigationCardHelp} transient />
          }}
        />
      </p>
      <p>
        <Trans
          i18nKey="scorepad.blooms"
          components={{
            blue: <Picture src={BlueFlower} css={pictureCss} />,
            red: <Picture src={RedFlower} css={pictureCss} />,
            yellow: <Picture src={YellowFlower} css={pictureCss} />
          }}
        />
      </p>
      <p>
        <Trans
          i18nKey="scorepad.trees"
          components={{
            tree: <Picture src={TreeIcon} css={pictureCss} />
          }}
        />
      </p>
      <p>
        <Trans
          i18nKey="scorepad.animals"
          components={{
            animal: <Picture src={AnimalIcon} css={pictureCss} />
          }}
        />
      </p>
      <p>
        <Trans
          i18nKey="scorepad.visitors"
          components={{
            visitor: <Picture src={VisitorIcon} css={pictureCss} />
          }}
        />
      </p>
      <p>
        <Trans
          i18nKey="scorepad.objectives"
          components={{
            icon: <Picture src={ObjectiveIcon} css={pictureCss} />,
            objective: <PlayMoveButton css={linkButtonCss} move={displayFirstObjectiveTileHelp} transient />
          }}
        />
      </p>
      <p>{t('scorepad.winner')}</p>
      <p>{t('scorepad.tie')}</p>
    </>
  )
}

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.5em;
`
