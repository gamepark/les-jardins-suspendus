/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { Animal, Flower, Garden, gardensAnatomy, isAnimal, isTree, isVisitor, Tree, Visitor } from '@gamepark/les-jardins-suspendus/material/Garden'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { linkButtonCss, MaterialComponent, MaterialHelpProps, Picture, PlayMoveButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Location, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import AnimalIcon from '../../images/icons/Animal.png'
import BlueFlower from '../../images/icons/BlueFlower.png'
import Irrigated from '../../images/icons/Irrigated.jpg'
import RedFlower from '../../images/icons/RedFlower.png'
import TreeIcon from '../../images/icons/Tree.png'
import VisitorIcon from '../../images/icons/Visitor.png'
import YellowFlower from '../../images/icons/YellowFlower.png'
import { scorePadDescription } from '../ScorePadDescription'
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
  return (
    <>
      {anatomy.irrigation && <IrrigationHelp />}
      {anatomy.flowers && <FlowersHelp flowers={anatomy.flowers} />}
      {isAnimal(anatomy.main) && <AnimalHelp animal={anatomy.main} scoring={anatomy.animalScoring!} />}
      {isTree(anatomy.main) && <TreeHelp tree={anatomy.main} />}
      {isVisitor(anatomy.main) && <VisitorHelp visitor={anatomy.main} />}
      {!anatomy.main && <EmptyCardHelp />}
    </>
  )
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

const FlowersHelp = ({ flowers }: { flowers: Flower[] }) => {
  return (
    <p>
      <Trans
        defaults="card.flowers"
        components={{
          flowers: (
            <>
              {flowers.map((flower, index) => (
                <Picture key={index} src={flowerIcon[flower]} css={pictureCss} />
              ))}
            </>
          ),
          score: <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.ScorePad, scorePadDescription.staticItem)} transient />
        }}
      />
    </p>
  )
}

const flowerIcon = {
  [Flower.Blue]: BlueFlower,
  [Flower.Red]: RedFlower,
  [Flower.Yellow]: YellowFlower
}

const AnimalHelp = ({ animal, scoring }: { animal: Animal; scoring: number[] }) => {
  const min = Math.min(...scoring)
  const max = Math.max(...scoring)
  return (
    <p>
      <Trans
        defaults={`card.animal.${animal}`}
        values={{ min, max }}
        components={{
          animal: <Picture src={AnimalIcon} css={pictureCss} />
        }}
      />
    </p>
  )
}

const TreeHelp = ({ tree }: { tree: Tree }) => {
  const { t } = useTranslation()
  return (
    <>
      <p>
        <Trans
          defaults="card.tree"
          components={{
            tree: <Picture src={TreeIcon} css={pictureCss} />
          }}
        />
      </p>
      <p>{t(`card.tree.${tree}`)}</p>
    </>
  )
}

const VisitorHelp = ({ visitor }: { visitor: Visitor }) => {
  const { t } = useTranslation()
  return (
    <p>
      <Picture src={VisitorIcon} css={pictureCss} />
      &nbsp;
      {t(`visitor.${visitor}`)}
    </p>
  )
}

const EmptyCardHelp = () => {
  const { t } = useTranslation()
  return <p>{t('card.empty')}</p>
}
