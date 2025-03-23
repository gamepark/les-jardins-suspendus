import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/les-jardins-suspendus/material/MaterialType'
import { LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { miniBoardDescription } from '../material/MiniBoardDescription'

class GardenerSpaceLocator extends Locator {
  parentItemType = MaterialType.MiniBoard

  getParentItem(_location: Location, context: MaterialContext) {
    return miniBoardDescription.getStaticItems(context)[0]
  }

  locationDescription = new LocationDescription({
    width: 1.9,
    height: 1.9,
    borderRadius: 1,
    extraCss: css`
      border: 1px solid red;
    `
  })

  getPositionOnParent({ id, x = 0 }: Location, { rules: { players } }: MaterialContext) {
    return this.positions[Math.max(2, players.length)][id as number][x]
  }

  positions: Record<number, Record<number, XYCoordinates[]>> = {
    [2]: {
      [1]: [
        { x: 14, y: 63 },
        { x: 26.3, y: 63 }
      ],
      [2]: [
        { x: 43.3, y: 63 },
        { x: 55.6, y: 63 }
      ],
      [3]: [
        { x: 74.4, y: 63 },
        { x: 86.6, y: 63 }
      ]
    },
    [3]: {
      [1]: [
        { x: 17.9, y: 52.5 },
        { x: 10.7, y: 78.7 },
        { x: 25, y: 78.7 }
      ],
      [2]: [
        { x: 50, y: 52.5 },
        { x: 42.7, y: 78.7 },
        { x: 57.1, y: 78.7 }
      ],
      [3]: [
        { x: 81.8, y: 52.5 },
        { x: 74.5, y: 78.7 },
        { x: 89, y: 78.7 }
      ]
    },
    [4]: {
      [1]: [
        { x: 15, y: 53 },
        { x: 26.5, y: 53 },
        { x: 9.3, y: 80 },
        { x: 20.7, y: 80 }
      ],
      [2]: [
        { x: 50, y: 45.5 },
        { x: 42.5, y: 63 },
        { x: 57.5, y: 63 },
        { x: 50, y: 80 }
      ],
      [3]: [
        { x: 73.1, y: 53 },
        { x: 84.5, y: 53 },
        { x: 78.9, y: 80 },
        { x: 90.3, y: 80 }
      ]
    },
    [5]: {
      [1]: [
        { x: 13.6, y: 52.3 },
        { x: 22.1, y: 52.3 },
        { x: 9.2, y: 81 },
        { x: 17.7, y: 81 },
        { x: 26.8, y: 81 }
      ],
      [2]: [
        { x: 45.6, y: 52.3 },
        { x: 54.3, y: 52.3 },
        { x: 41.2, y: 81 },
        { x: 49.8, y: 81 },
        { x: 58.9, y: 81 }
      ],
      [3]: [
        { x: 78, y: 52.3 },
        { x: 86.6, y: 52.3 },
        { x: 73.7, y: 81 },
        { x: 82.1, y: 81 },
        { x: 91.2, y: 81 }
      ]
    }
  }

  navigationSorts = []
}

export const gardenerSpaceLocator = new GardenerSpaceLocator()
