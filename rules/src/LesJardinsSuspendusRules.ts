import { HiddenMaterialRules, hideItemId, MaterialGame, MaterialItem, MaterialMove, PositiveSequenceStrategy, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { PlaceGardenCard } from './rules/PlaceGardenCard'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class LesJardinsSuspendusRules
  extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  rules = {
    [RuleId.PlaceGardenCard]: PlaceGardenCard
  }

  locationsStrategies = {
    [MaterialType.GardenCard]: {
      [LocationType.GardenCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.MainBoardSpace]: new PositiveSequenceStrategy('y')
    },
    [MaterialType.EnhancementTile]: {
      [LocationType.EnhancementPile]: new PositiveSequenceStrategy()
    },
    [MaterialType.Gardener]: {
      [LocationType.GardenerSpace]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.GardenCard]: {
      [LocationType.GardenCardsDeck]: hideItemId
    },
    [MaterialType.EnhancementTile]: {
      [LocationType.EnhancementPile]: (item: MaterialItem) => (item.location.rotation ? ['id.front'] : [])
    }
  }

  giveTime(): number {
    return 60
  }
}
