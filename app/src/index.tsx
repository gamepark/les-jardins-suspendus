/** @jsxImportSource @emotion/react */
import { LesJardinsSuspendusOptionsSpec } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusOptions'
import { LesJardinsSuspendusRules } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusRules'
import { LesJardinsSuspendusSetup } from '@gamepark/les-jardins-suspendus/LesJardinsSuspendusSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="les-jardins-suspendus"
      Rules={LesJardinsSuspendusRules}
      optionsSpec={LesJardinsSuspendusOptionsSpec}
      GameSetup={LesJardinsSuspendusSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
