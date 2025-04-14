/** @jsxImportSource @emotion/react */
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const GardenCardHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('card')}</h2>
      {item.location?.type === LocationType.GardenCardsDeck && <GardenCardDeckHelp />}
    </>
  )
}

const GardenCardDeckHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<LesJardinsSuspendusRules>()!
  const cards = rules.material(MaterialType.GardenCard).location(LocationType.GardenCardsDeck).length
  return <p>{t('card.deck', { cards })}</p>
}
