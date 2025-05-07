import { ListLocator } from '@gamepark/react-game'

class AutomatonObjectiveMarkersLocator extends ListLocator {
  coordinates = { x: -23, y: -7.5 }
  gap = { x: 2 }
}

export const automatonObjectiveMarkersLocator = new AutomatonObjectiveMarkersLocator()
