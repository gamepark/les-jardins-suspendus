/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/les-jardins-suspendus/rules/RuleId'
import { ComponentType } from 'react'
import { TheFirstStepHeader } from './TheFirstStepHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlaceGardenCard]: TheFirstStepHeader
}
