/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const RevealNewGardenCardHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.reveal-card')}</>
}
