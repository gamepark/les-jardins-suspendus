import { css } from '@emotion/react'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { Animal, Flower, GardenAnatomy, isAnimal, isTree, isVisitor, Tree, Visitor } from '@gamepark/les-jardins-suspendus/material/Garden'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { linkButtonCss, Picture, PlayMoveButton, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import AnimalIcon from '../../images/icons/Animal.png'
import BlueFlower from '../../images/icons/BlueFlower.png'
import CrownIcon from '../../images/icons/CrownIcon.png'
import GoldLevelIcon from '../../images/icons/GoldLevelIcon.png'
import Irrigated from '../../images/icons/Irrigated.jpg'
import RedFlower from '../../images/icons/RedFlower.png'
import ToolLevelIcon from '../../images/icons/ToolLevelIcon.png'
import TreeIcon from '../../images/icons/Tree.png'
import VisitorIcon from '../../images/icons/Visitor.png'
import YellowFlower from '../../images/icons/YellowFlower.png'
import { scorePadDescription } from '../ScorePadDescription'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GardenAnatomyHelp = ({ anatomy, isCard }: { anatomy: GardenAnatomy; isCard?: boolean }) => {
  return (
    <>
      {anatomy.irrigation && <IrrigationHelp />}
      {anatomy.flowers && <FlowersHelp flowers={anatomy.flowers} />}
      {isAnimal(anatomy.main) && <AnimalHelp animal={anatomy.main} scoring={anatomy.animalScoring!} />}
      {isTree(anatomy.main) && <TreeHelp tree={anatomy.main} />}
      {isVisitor(anatomy.main) && <VisitorHelp visitor={anatomy.main} />}
      {isCard && !anatomy.main && <EmptyCardHelp />}
      {anatomy.crown && <CrownHelp />}
      {anatomy.gold && <GoldHelp />}
      {anatomy.tools && <ToolsHelp />}
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
        i18nKey="card.irrigated"
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
        i18nKey="card.flowers"
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
        i18nKey={`card.animal.${animal}`}
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
          i18nKey="card.tree"
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

const CrownHelp = () => {
  const rules = useRules<LesJardinsSuspendusRules>()!
  const firstPlayerMarker = rules.material(MaterialType.FirstPlayerMarker)
  const displayFirstPlayerMarkerHelp = displayMaterialHelp(MaterialType.FirstPlayerMarker, firstPlayerMarker.getItem(), firstPlayerMarker.getIndex())
  const firstObjectiveTile = rules.material(MaterialType.ObjectiveTile).limit(1)
  const displayFirstObjectiveTileHelp = displayMaterialHelp(MaterialType.ObjectiveTile, firstObjectiveTile.getItem(), firstObjectiveTile.getIndex())
  return (
    <p>
      <Trans
        i18nKey="card.crown"
        components={{
          crown: <Picture src={CrownIcon} css={pictureCss} />,
          marker: <PlayMoveButton css={linkButtonCss} move={displayFirstPlayerMarkerHelp} transient />,
          objective: <PlayMoveButton css={linkButtonCss} move={displayFirstObjectiveTileHelp} transient />
        }}
      />
    </p>
  )
}

const GoldHelp = () => {
  return (
    <p>
      <Trans
        i18nKey="card.gold"
        components={{
          icon: <Picture src={GoldLevelIcon} css={pictureCss} />,
          gold: <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.GoldCoin)} transient />
        }}
      />
    </p>
  )
}

const ToolsHelp = () => {
  return (
    <p>
      <Trans
        i18nKey="card.tools"
        components={{
          icon: <Picture src={ToolLevelIcon} css={pictureCss} />,
          tool: <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.Tool)} transient />
        }}
      />
    </p>
  )
}
