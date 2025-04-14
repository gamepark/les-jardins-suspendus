/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { Garden, gardensAnatomy } from '@gamepark/les-jardins-suspendus/material/Garden'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { linkButtonCss, MaterialComponent, MaterialHelpProps, Picture, PlayMoveButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Location, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import Irrigated from '../../images/icons/Irrigated.jpg'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GardenCardHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('card')}</h2>
      {item.location?.type === LocationType.GardenCardsDeck && <GardenCardDeckHelp />}
      {item.location?.type === LocationType.PlayerGarden && <GardenCardInGardenHelp location={item.location} />}
      {item.location?.type === LocationType.GameBoardSpace && <GardenCardAvailableHelp location={item.location} />}
      {item.id !== undefined && <GardenCardAnatomyHelp garden={item.id} />}
    </>
  )
}

const GardenCardDeckHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<LesJardinsSuspendusRules>()!
  const cards = rules.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).length
  return <p>{t('card.deck', { cards })}</p>
}

const GardenCardInGardenHelp = ({ location }: { location: Location }) => {
  const { t } = useTranslation()
  const me = usePlayerId()
  const player = usePlayerName(location.player)
  const level = location.y! + 1
  if (location.player === me) {
    return <p>{t('card.garden.you', { level })}</p>
  } else {
    return <p>{t('card.garden.player', { level, player })}</p>
  }
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
          defaults="card.cost"
          values={{ cost }}
          components={{
            tool: <MaterialComponent type={MaterialType.Tool} css={toolCss} />
          }}
        />
      </p>
    )
  }
}

const toolCss = css`
  display: inline-block;
  vertical-align: sub;
  font-size: 0.5em;
`

const GardenCardAnatomyHelp = ({ garden }: { garden: Garden }) => {
  const anatomy = gardensAnatomy[garden]
  return <>{anatomy.irrigation && <IrrigationHelp />}</>
}

const IrrigationHelp = () => {
  const rules = useRules<LesJardinsSuspendusRules>()!
  const player = usePlayerId<PlayerColor>()
  const card = rules.material(MaterialType.IrrigationCard).player(player ?? rules.players[0])
  const displayIrrigationCardHelp = displayMaterialHelp(MaterialType.IrrigationCard, card.getItem(), card.getIndex())
  return (
    <p>
      <Trans
        defaults="card.irrigated"
        components={{
          irrigated: <Picture src={Irrigated} css={pictureCss} />,
          card: <PlayMoveButton css={linkButtonCss} move={displayIrrigationCardHelp} transient />
        }}
      />
    </p>
  )
}

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.5em;
`
