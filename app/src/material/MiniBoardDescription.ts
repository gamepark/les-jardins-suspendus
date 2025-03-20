import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import MiniBoard1Or2Players from '../images/boards/MiniBoard1Or2Players.jpg'
import MiniBoard3Players from '../images/boards/MiniBoard3Players.jpg'
import MiniBoard4Players from '../images/boards/MiniBoard4Players.jpg'
import MiniBoard5Players from '../images/boards/MiniBoard5Players.jpg'

class MiniBoardDescription extends BoardDescription {
  width = 24.5
  height = 6
  images = {
    [1]: MiniBoard1Or2Players,
    [2]: MiniBoard1Or2Players,
    [3]: MiniBoard3Players,
    [4]: MiniBoard4Players,
    [5]: MiniBoard5Players
  }

  getStaticItems({ rules: { players } }: MaterialContext) {
    return [{ id: players.length, location: { type: LocationType.MiniBoardPlace } }]
  }
}

export const miniBoardDescription = new MiniBoardDescription()
