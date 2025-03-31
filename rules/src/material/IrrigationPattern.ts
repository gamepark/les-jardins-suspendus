export enum IrrigationPattern {
  Left = 1,
  Right,
  Borders,
  Center,
  H
}

const _ = false
const O = true

const leftIrrigationPattern = [
  [O, O, _],
  [O, O, _, _],
  [O, O, _, _, _]
]

const rightIrrigationPattern = [
  [_, O, O],
  [_, _, O, O],
  [_, _, _, O, O]
]

const bordersIrrigationPattern = [
  [O, _, O],
  [O, _, _, O],
  [O, _, _, _, O]
]

const centerIrrigationPattern = [
  [_, O, _],
  [_, O, O, _],
  [_, O, O, O, _]
]

const hIrrigationPattern = [
  [O, _, O],
  [_, O, O, _],
  [_, O, _, O, _]
]

export const irrigationPatterns: Record<IrrigationPattern, boolean[][]> = {
  [IrrigationPattern.Left]: leftIrrigationPattern,
  [IrrigationPattern.Right]: rightIrrigationPattern,
  [IrrigationPattern.Borders]: bordersIrrigationPattern,
  [IrrigationPattern.Center]: centerIrrigationPattern,
  [IrrigationPattern.H]: hIrrigationPattern
}

export const irrigationScore = [0, 1, 2, 4, 7, 10, 15]
