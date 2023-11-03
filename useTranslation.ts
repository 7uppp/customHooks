import { useLocalStorage } from './useStorage'
import * as translations from './translations'

type TranslationFunction = (key: string) => string | undefined

export default function useTranslation(lang: string, fallbackLang: string) {
  const [language, setLanguage] = useLocalStorage<string>('language', lang)
  const [fallbackLanguage, setFallbackLanguage] = useLocalStorage<string>(
    'fallbackLanguage',
    fallbackLang
  )

  const translate: TranslationFunction = (key) => {
    const keys = key.split('.')
    return (
      getNestedTranslation(language, keys) ??
      getNestedTranslation(fallbackLanguage, keys) ??
      key
    )
  }

  return {
    language,
    setLanguage,
    fallbackLanguage,
    setFallbackLanguage,
    t: translate,
  }
}

function getNestedTranslation(
  language: string,
  keys: string[]
): string | undefined {
  return keys.reduce((obj, key) => {
    return obj?.[key]
  }, translations[language])
}

//Usage

export default function TranslationComponent() {
  const { language, setLanguage, fallbackLanguage, setFallbackLanguage, t } =
    useTranslation('zh', 'en')
  return (
    <>
      <div>使用{language}</div>
      <div>{t('hi')}</div>
      <div>{t('bye')}</div>
      <div>{t('nested.value')}</div>
      <button onClick={() => setLanguage('zh')}>切换中文</button>
      <button onClick={() => setLanguage('en')}>切换英文</button>
      <div>喜好的语音{fallbackLanguage}</div>
      <button onClick={() => setFallbackLanguage('zh')}>
        切换到喜好的语言
      </button>
    </>
  )
}
