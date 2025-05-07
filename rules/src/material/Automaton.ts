export enum Automaton {
  Automaton1 = 1,
  Automaton2,
  Automaton3,
  Automaton4,
  Automaton5,
  Automaton6,
  Automaton7,
  Automaton8,
  Automaton9,
  Automaton10,
  Automaton11,
  Automaton12,
  Automaton13,
  Automaton14,
  Automaton15,
  Automaton16,
  Automaton17,
  Automaton18
}

export enum SoloDifficulty {
  Easy = 1,
  Medium,
  Advanced,
  Expert
}

export const getSoloGold = (difficulty = SoloDifficulty.Easy) => 4 - difficulty
export const getSoloTools = (difficulty = SoloDifficulty.Easy) => 5 - difficulty
