import { css } from '@emotion/react'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { Garden, gardensAnatomy } from '@gamepark/les-jardins-suspendus/material/Garden'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { linkButtonCss, MaterialHelpProps, Picture, PlayMoveButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Location, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import Tool from '../../images/Tool.png'
import { GardenAnatomyHelp } from './GardenAnatomyHelp'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GardenCardHelp = ({ item, itemIndex }: MaterialHelpProps) => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('card')}</h2>
      {item.location?.type === LocationType.GardenCardsDeck && <GardenCardDeckHelp />}
      {item.location?.type === LocationType.PlayerGarden && <GardenCardInGardenHelp location={item.location} index={itemIndex} />}
      {item.location?.type === LocationType.GameBoardSpace && <GardenCardAvailableHelp location={item.location} />}
      {item.id !== undefined && <GardenAnatomyHelp anatomy={gardensAnatomy[item.id as Garden]} isCard />}
    </>
  )
}

const GardenCardDeckHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<LesJardinsSuspendusRules>()!
  const cards = rules.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).length
  return <p>{t('card.deck', { cards })}</p>
}

const GardenCardInGardenHelp = ({ location, index }: { location: Location; index?: number }) => {
  const { t } = useTranslation()
  const me = usePlayerId()
  const player = usePlayerName(location.player)
  const level = location.y! + 1
  const rules = useRules<LesJardinsSuspendusRules>()!
  const enhancement = rules.material(MaterialType.EnhancementTile).parent(index ?? -1)
  const displayEnhancementHelp = displayMaterialHelp(MaterialType.EnhancementTile, enhancement.getItem(), enhancement.getIndex())
  return (
    <>
      <p>{t(location.player === me ? 'card.garden.you' : 'card.garden.player', { level, player })}</p>
      {enhancement.length === 1 && (
        <p>
          <Trans
            i18nKey="card.enhancement"
            components={{
              enhancement: <PlayMoveButton css={linkButtonCss} move={displayEnhancementHelp} transient />
            }}
          />
        </p>
      )}
    </>
  )
}

const GardenCardAvailableHelp = ({ location }: { location: Location }) => {
  const { t } = useTranslation()
  const cost = location.y!
  if (!cost) {
    return <p>{t('card.free')}</p>
  } else {
    return (
      <p>
        <Trans
          i18nKey="card.cost"
          values={{ cost }}
          components={{
            tool: <Picture src={Tool} css={pictureCss} />
          }}
        />
      </p>
    )
  }
}

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.5em;
`
