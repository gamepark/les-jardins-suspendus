/** @jsxImportSource @emotion/react */
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { Location } from '../../../../../rules-api'

export const GardenCardHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('card')}</h2>
      {item.location?.type === LocationType.GardenCardsDeck && <GardenCardDeckHelp />}
      {item.location?.type === LocationType.PlayerGarden && <GardenCardInGardenHelp location={item.location} />}
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
