/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { SoloDifficulty } from '@gamepark/les-jardins-suspendus/material/Automa'
import { Flower } from '@gamepark/les-jardins-suspendus/material/Garden'
import { PlayerColor } from '@gamepark/les-jardins-suspendus/PlayerColor'
import { Memory } from '@gamepark/les-jardins-suspendus/rules/Memory'
import { Picture, ScoringDescription, ScoringValue } from '@gamepark/react-game'
import { getEnumValues } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Animal from '../src/images/icons/Animal.png'
import BlueFlower from '../src/images/icons/BlueFlower.png'
import Irrigation from '../src/images/icons/Irrigation.png'
import Objective from '../src/images/icons/Objective.png'
import RedFlower from '../src/images/icons/RedFlower.png'
import Tree from '../src/images/icons/Tree.png'
import Visitor from '../src/images/icons/Visitor.png'
import YellowFlower from '../src/images/icons/YellowFlower.png'

enum ScoringKey {
  Irrigation = 1,
  BlueFlowers,
  RedFlowers,
  YellowFlowers,
  Trees,
  Animals,
  Visitors,
  Objectives,
  Total,
  SoloMode,
  SoloComment
}

export class LesJardinsSuspendusScoringDescription implements ScoringDescription {
  getScoringKeys(rules: LesJardinsSuspendusRules) {
    return rules.players.length === 1 ? getEnumValues(ScoringKey) : getEnumValues(ScoringKey).filter((key) => key < 10)
  }

  getScoringHeader(key: ScoringKey): ScoringValue {
    switch (key) {
      case ScoringKey.Irrigation:
        return <Picture src={Irrigation} css={iconCss} />
      case ScoringKey.BlueFlowers:
        return <Picture src={BlueFlower} css={iconCss} />
      case ScoringKey.RedFlowers:
        return <Picture src={RedFlower} css={iconCss} />
      case ScoringKey.YellowFlowers:
        return <Picture src={YellowFlower} css={iconCss} />
      case ScoringKey.Trees:
        return <Picture src={Tree} css={iconCss} />
      case ScoringKey.Animals:
        return <Picture src={Animal} css={iconCss} />
      case ScoringKey.Visitors:
        return <Picture src={Visitor} css={iconCss} />
      case ScoringKey.Objectives:
        return <Picture src={Objective} css={iconCss} />
      case ScoringKey.Total:
        return <span css={totalCss}>=</span>
      case ScoringKey.SoloMode:
        return <Trans defaults="solo.diff" />
      case ScoringKey.SoloComment:
        return <Trans defaults="comment" />
    }
  }

  getScoringPlayerData(key: ScoringKey, player: PlayerColor, rules: LesJardinsSuspendusRules) {
    switch (key) {
      case ScoringKey.Irrigation:
        return rules.scoreIrrigation(player)
      case ScoringKey.BlueFlowers:
        return rules.scoreBlooms(player, Flower.Blue)
      case ScoringKey.RedFlowers:
        return rules.scoreBlooms(player, Flower.Red)
      case ScoringKey.YellowFlowers:
        return rules.scoreBlooms(player, Flower.Yellow)
      case ScoringKey.Trees:
        return rules.scoreTrees(player)
      case ScoringKey.Animals:
        return rules.scoreAnimals(player)
      case ScoringKey.Visitors:
        return rules.scoreVisitors(player)
      case ScoringKey.Objectives:
        return rules.scoreRoyalObjectives(player)
      case ScoringKey.Total:
        return rules.getScore(player)
      case ScoringKey.SoloMode:
        return <Trans defaults={`solo.diff.${rules.remind(Memory.SoloDifficulty) ?? SoloDifficulty.Easy}`} />
      case ScoringKey.SoloComment:
        return <Trans defaults={`comment.${getCommentNumber(rules.getScore(player))}`} />
    }
  }
}

const iconCss = css`
  height: 1em;
  transform: scale(1.8) translateY(0.1em);
`

const totalCss = css`
  font-size: 1.5em;
  font-weight: bold;
  line-height: 0.7;
`

function getCommentNumber(score: number) {
  if (score <= 45) return 1
  else if (score <= 55) return 2
  else if (score <= 65) return 3
  else return 4
}
