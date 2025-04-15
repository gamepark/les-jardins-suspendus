/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { MaterialHelpProps, Picture, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import Tool from '../../images/Tool.png'

export const ToolHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const me = usePlayerId<PlayerColor>()
  const owner = item.location?.player
  const player = usePlayerName(owner)
  return (
    <>
      <h2>{t('tool')}</h2>
      <p>{t('tool.use')}</p>
      {owner !== undefined && (
        <p>
          <Trans
            defaults={owner === me ? 'amount.you' : 'amount.player'}
            values={{ amount: item.quantity, player }}
            components={{
              icon: <Picture src={Tool} css={pictureCss} />
            }}
          />
        </p>
      )}
    </>
  )
}

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.5em;
`
