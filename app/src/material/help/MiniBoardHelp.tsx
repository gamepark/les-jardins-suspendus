import { useTranslation } from 'react-i18next'
import { BoardCardRulesHelp } from './GameBoardHelp'

export const MiniBoardHelp = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('mini-board')}</h2>
      <BoardCardRulesHelp />
      <p>{t('mini-board.players')}</p>
    </>
  )
}
