import { LesJardinsSuspendusOptionsSpec } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusOptions'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { LesJardinsSuspendusSetup } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { LesJardinsSuspendusScoringDescription } from './LesJardinsSuspendusScoringDescription'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="les-jardins-suspendus"
      Rules={LesJardinsSuspendusRules}
      optionsSpec={LesJardinsSuspendusOptionsSpec}
      GameSetup={LesJardinsSuspendusSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      scoring={new LesJardinsSuspendusScoringDescription()}
      tutorial={new Tutorial()}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
