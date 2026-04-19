import { useState } from 'react'
import { T } from '../tokens.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

export function ProfileScreen({ plants, onRemovePlant }) {
  const { t, locale, setLocale } = useLocale()
  const [confirmId, setConfirmId] = useState(null)

  return (
    <div style={{ height: '100%', background: T.bg, overflowY: 'auto', paddingBottom: 120 }}>
      <div style={{ padding: '56px 20px 12px' }}>
        <div style={{ fontSize: 13, color: T.ink3, fontWeight: 500, marginBottom: 2 }}>{t('profile.subtitle')}</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: T.ink, letterSpacing: -0.8 }}>{t('profile.title')}</div>
      </div>

      {/* Language switcher */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink3, letterSpacing: 0.3, marginBottom: 10 }}>
          {t('profile.language')}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ id: 'de', label: t('profile.lang.de') }, { id: 'en', label: t('profile.lang.en') }].map(lang => {
            const active = locale === lang.id
            return (
              <button
                key={lang.id}
                onClick={() => setLocale(lang.id)}
                style={{
                  padding: '10px 20px', borderRadius: 12,
                  background: active ? T.green : '#fff',
                  color: active ? '#fff' : T.ink2,
                  border: `1px solid ${active ? T.green : T.line}`,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >{lang.label}</button>
            )
          })}
        </div>
      </div>

      {/* Plant list */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink3, letterSpacing: 0.3, marginBottom: 12 }}>
          {t('profile.myPlants', { count: plants.length })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {plants.map(p => (
            <div key={p.id} style={{
              background: '#fff', borderRadius: 16, padding: '12px 14px',
              border: `0.5px solid ${T.line}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `oklch(0.92 0.06 ${p.hue})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 600, color: `oklch(0.45 0.1 ${p.hue})`,
                flexShrink: 0,
              }}>{p.letter}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, letterSpacing: -0.2 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: T.ink3 }}>
                  {t('profile.plantMeta', { room: p.room, frequency: p.frequency })}
                </div>
              </div>
              {confirmId === p.id ? (
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => { onRemovePlant(p.id); setConfirmId(null) }}
                    style={{
                      padding: '6px 10px', borderRadius: 8,
                      background: T.danger, color: '#fff', border: 'none',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t('profile.delete')}</button>
                  <button
                    onClick={() => setConfirmId(null)}
                    style={{
                      padding: '6px 10px', borderRadius: 8,
                      background: T.line, color: T.ink2, border: 'none',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t('profile.cancel')}</button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmId(p.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                    color: T.ink3,
                  }}>
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path d="M1 4h14M6 4V2h4v2M2 4l1 12h10l1-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
