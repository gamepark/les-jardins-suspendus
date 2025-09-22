import { useTranslation } from 'react-i18next'

export const AutomaHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.automa')}</>
}
