/** @jsxImportSource @emotion/react */
import { EnhancementType } from '@gamepark/les-jardins-suspendus/material/Enhancement'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { linkButtonCss, PlayMoveButton, useMaterialContext, usePlayerId } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { miniBoardDescription } from '../MiniBoardDescription'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GameBoardHelp = () => {
  const { t } = useTranslation()
  const context = useMaterialContext()
  const rules = context.rules
  const player = usePlayerId<PlayerColor>()
  const firstObjectiveTile = rules.material(MaterialType.ObjectiveTile).limit(1)
  const displayFirstObjectiveTileHelp = displayMaterialHelp(MaterialType.ObjectiveTile, firstObjectiveTile.getItem(), firstObjectiveTile.getIndex())
  const firstEnhancementTile = rules
    .material(MaterialType.EnhancementTile)
    .location(LocationType.EnhancementPile)
    .locationId(EnhancementType.Simple)
    .maxBy((item) => item.location.x!)
  const displayFirstEnhancementTileHelp = displayMaterialHelp(MaterialType.EnhancementTile, firstEnhancementTile.getItem(), firstEnhancementTile.getIndex())
  const card = rules
    .material(MaterialType.GardenCard)
    .location(LocationType.GameBoardSpace)
    .locationId(1)
    .minBy((item) => item.location.y!)
  const displayCardHelp = displayMaterialHelp(MaterialType.GardenCard, card.getItem(), card.getIndex())
  const displayMiniBoardHelp = displayMaterialHelp(MaterialType.MiniBoard, miniBoardDescription.getStaticItems(context)[0])
  const gardener = rules.material(MaterialType.Gardener).id(player ?? rules.players[0])
  const displayGardenerHelp = displayMaterialHelp(MaterialType.Gardener, gardener.getItem(), gardener.getIndex())
  return (
    <>
      <h2>{t('board')}</h2>
      <p>
        <Trans
          defaults="board.objectives"
          components={{
            objective: <PlayMoveButton css={linkButtonCss} move={displayFirstObjectiveTileHelp} transient />
          }}
        />
      </p>
      <p>
        <Trans
          defaults="board.enhancements"
          components={{
            enhancement: <PlayMoveButton css={linkButtonCss} move={displayFirstEnhancementTileHelp} transient />,
            gold: <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.GoldCoin)} transient />
          }}
        />
      </p>
      <p>
        <Trans
          defaults="board.cards"
          components={{
            card: <PlayMoveButton css={linkButtonCss} move={displayCardHelp} transient />
          }}
        />
      </p>
      <p>
        <Trans
          defaults="board.cards.rules"
          components={{
            mini: <PlayMoveButton css={linkButtonCss} move={displayMiniBoardHelp} transient />,
            gardener: <PlayMoveButton css={linkButtonCss} move={displayGardenerHelp} transient />,
            tool: <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.Tool)} transient />
          }}
        />
      </p>
    </>
  )
}
