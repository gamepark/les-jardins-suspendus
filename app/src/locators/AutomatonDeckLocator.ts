import { DeckLocator } from '@gamepark/react-game'

class AutomatonDeckLocator extends DeckLocator {
  coordinates = { x: -20, y: -15 }
  navigationSorts = []
}

export const automatonDeckLocator = new AutomatonDeckLocator()
