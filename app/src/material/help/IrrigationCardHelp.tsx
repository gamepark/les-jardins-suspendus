/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { MaterialHelpProps, Picture, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import Irrigation from '../../images/icons/Irrigation.png'

export const IrrigationCardHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const me = usePlayerId<PlayerColor>()
  const player = usePlayerName(item.location?.player)
  return (
    <>
      <h2>{t('irrigation')}</h2>
      <p>{item.location?.player === me ? t('irrigation.you') : t('irrigation.player', { player })}</p>
      <p>
        <Trans
          defaults="card.irrigated"
          components={{
            irrigated: <Picture src={Irrigation} css={pictureCss} />,
            card: <strong />
          }}
        />
      </p>
    </>
  )
}

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.5em;
`
