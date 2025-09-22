import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { Flower } from '@gamepark/les-jardins-suspendus/material/Garden'
import { LocationType } from '@gamepark/les-jardins-suspendus/material/LocationType'
import { BoardDescription, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import ScorePad from '../images/ScorePad.jpg'
import { ScorePadHelp } from './help/ScorePadHelp'

class ScorePadDescription extends BoardDescription {
  width = 10
  height = 10
  image = ScorePad
  staticItem = { location: { type: LocationType.ScorePadPlace } }

  getLocations(_item: MaterialItem, context: ItemContext) {
    const rules = context.rules as LesJardinsSuspendusRules
    if (!rules.isOver()) return []
    const locations: Location[] = []
    for (let x = 0; x < rules.players.length; x++) {
      const player = rules.players[x]
      const anatomy = rules.getPlayerGardenAnatomy(player)
      locations.push({ type: LocationType.ScorePadBox, x, y: 0, player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 1, z: rules.scoreIrrigation(player, anatomy), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 2, z: rules.scoreBlooms(player, Flower.Blue, anatomy), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 3, z: rules.scoreBlooms(player, Flower.Red, anatomy), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 4, z: rules.scoreBlooms(player, Flower.Yellow, anatomy), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 5, z: rules.scoreTrees(player, anatomy), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 6, z: rules.scoreAnimals(player, anatomy), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 7, z: rules.scoreVisitors(player, anatomy), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 8, z: rules.scoreRoyalObjectives(player), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 9, z: rules.getScore(player), player })
    }
    return locations
  }

  help = ScorePadHelp
}

export const scorePadDescription = new ScorePadDescription()
