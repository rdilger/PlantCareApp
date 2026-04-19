import { createContext, useContext, useState, useMemo } from 'react'
import { de } from './de.js'
import { en } from './en.js'

const TRANSLATIONS = { de, en }

function detectLocale() {
  const stored = localStorage.getItem('plantcare_locale')
  if (stored === 'de' || stored === 'en') return stored
  const lang = navigator.language || 'en'
  return lang.startsWith('de') ? 'de' : 'en'
}

// Interpolate {{key}} placeholders: t('home.status.allOk', { count: 5 })
function interpolate(str, vars) {
  if (!vars || typeof str !== 'string') return str
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`)
}

const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale)

  const setLocale = (lang) => {
    localStorage.setItem('plantcare_locale', lang)
    setLocaleState(lang)
  }

  const value = useMemo(() => {
    const strings = TRANSLATIONS[locale] || de

    const t = (key, vars) => {
      const str = strings[key] ?? de[key] ?? key
      return interpolate(str, vars)
    }

    // Intl-based date helpers — no hardcoded arrays needed
    const dateLocale = strings.locale
    const formatDate = (isoDate, options) => {
      if (!isoDate) return '—'
      return new Intl.DateTimeFormat(dateLocale, options).format(new Date(isoDate))
    }
    const monthName = (monthIndex) =>
      new Intl.DateTimeFormat(dateLocale, { month: 'long' }).format(new Date(2000, monthIndex, 1))
    const dayShort = (dayIndex) => // 0=Mon … 6=Sun
      new Intl.DateTimeFormat(dateLocale, { weekday: 'short' })
        .format(new Date(2000, 0, 3 + dayIndex)) // Jan 3 2000 = Monday

    return { locale, setLocale, t, formatDate, monthName, dayShort, dateLocale }
  }, [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}
