import { useTranslation } from 'react-i18next'

export const GardenerHelp = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('gardener')}</h2>
      <p>{t('gardener.rule')}</p>
      <p>{t('gardener.round')}</p>
    </>
  )
}
