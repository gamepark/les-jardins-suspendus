import { getEnumValues, OptionsSpecV2 } from '@gamepark/rules-api'
import { SoloDifficulty } from './material/Automa'
import { PlayerColor, playerColors } from './PlayerColor'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: PlayerColor }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type LesJardinsSuspendusOptions = {
  players: PlayerOptions[]
  soloDifficulty: SoloDifficulty
}

/**
 * The option space of les-jardins-suspendus: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 *
 * That is where the competitive settings went.
 */
export const LesJardinsSuspendusOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 1, max: 5 },
  identities: { values: playerColors },
  options: {
    soloDifficulty: { kind: 'enum', playerCount: { max: 1 }, values: getEnumValues(SoloDifficulty) }
  }
}
