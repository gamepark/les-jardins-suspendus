import { css } from '@emotion/react'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { EnhancementType } from '@gamepark/les-jardins-suspendus/material/Enhancement'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { linkButtonCss, MaterialHelpProps, Picture, PlayMoveButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import GoldCoin from '../../images/GoldCoin.png'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GoldCoinHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<LesJardinsSuspendusRules>()!
  const me = usePlayerId<PlayerColor>()
  const firstEnhancementTile = rules
    .material(MaterialType.EnhancementTile)
    .location(LocationType.EnhancementPile)
    .locationId(EnhancementType.Simple)
    .maxBy((item) => item.location.x!)
  const displayFirstEnhancementTileHelp = displayMaterialHelp(MaterialType.EnhancementTile, firstEnhancementTile.getItem(), firstEnhancementTile.getIndex())
  const owner = item.location?.player
  const player = usePlayerName(owner)
  return (
    <>
      <h2>{t('gold')}</h2>
      <p>
        <Trans
          i18nKey="gold.use"
          components={{
            enhancement: <PlayMoveButton css={linkButtonCss} move={displayFirstEnhancementTileHelp} transient />
          }}
        />
      </p>
      {owner !== undefined && (
        <p>
          <Trans
            i18nKey={owner === me ? 'amount.you' : 'amount.player'}
            values={{ amount: item.quantity, player }}
            components={{
              icon: <Picture src={GoldCoin} css={pictureCss} />
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
