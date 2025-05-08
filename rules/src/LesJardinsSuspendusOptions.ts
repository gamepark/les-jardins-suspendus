import { getEnumValues, OptionsSpec } from '@gamepark/rules-api'
import { getSoloGold, getSoloTools, SoloDifficulty } from './material/Automa'
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
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const LesJardinsSuspendusOptionsSpec: OptionsSpec<LesJardinsSuspendusOptions> = {
  players: {
    id: {
      label: (t) => t('player.id'),
      values: playerColors,
      valueSpec: (id) => ({ label: (t) => t(`player.${id}`) })
    }
  },
  soloDifficulty: {
    label: (t) => t('solo.diff'),
    values: getEnumValues(SoloDifficulty),
    valueSpec: (diff) => ({ label: (t) => t(`solo.diff.${diff}`), help: (t) => t('solo.diff.help', { gold: getSoloGold(diff), tools: getSoloTools(diff) }) }),
    competitiveDisabled: true,
    solo: true
  }
}
