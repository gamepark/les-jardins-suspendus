import { css } from '@emotion/react'
import { EnhancementId, enhancementsAnatomy } from '@gamepark/les-jardins-suspendus/material/Enhancement'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import GoldCoin from '../../images/GoldCoin.png'
import { GardenAnatomyHelp } from './GardenAnatomyHelp'

export const EnhancementTileHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const id = item.id as EnhancementId

  return (
    <>
      <h2>{t('enhancement')}</h2>
      <p>{t('enhancement.rule')}</p>
      <p>
        <Trans
          i18nKey="enhancement.cost"
          values={{ cost: id.back + 1 }}
          components={{
            gold: <Picture src={GoldCoin} css={pictureCss} />
          }}
        />
      </p>
      {id.front !== undefined && <GardenAnatomyHelp anatomy={enhancementsAnatomy[id.front]} />}
    </>
  )
}

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.5em;
`
