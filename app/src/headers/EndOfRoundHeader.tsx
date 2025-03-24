/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const EndOfRoundHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.end-round')}</>
}
