import { HiddenMaterialRules, hideItemId, MaterialGame, MaterialMove, PositiveSequenceStrategy, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { TheFirstStepRule } from './rules/TheFirstStepRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class LesJardinsSuspendusRules
  extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor> {
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
  }

  locationsStrategies = {
    [MaterialType.GardenCard]: {
      [LocationType.GardenCardsDeck]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.GardenCard]: {
      [LocationType.GardenCardsDeck]: hideItemId
    }
  }

  giveTime(): number {
    return 60
  }
}
