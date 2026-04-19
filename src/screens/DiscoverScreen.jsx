import { useState } from 'react'
import { T, Icon, PlantImg } from '../tokens.jsx'
import { ScreenShell } from '../components/ScreenShell.jsx'
import { AppHeader } from '../components/AppHeader.jsx'
import { SectionHeader } from '../components/SectionHeader.jsx'
import { DISCOVER, CATEGORIES } from '../data.js'
import { useLocale } from '../i18n/LocaleContext.jsx'

function loadFavs() {
  try { return new Set(JSON.parse(localStorage.getItem('plantcare_favs') || '[]')) } catch { return new Set() }
}
function saveFavs(set) {
  localStorage.setItem('plantcare_favs', JSON.stringify([...set]))
}

export function DiscoverScreen({ onAddFromDiscover }) {
  const { t } = useLocale()
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')
  const [favs, setFavs] = useState(() => loadFavs())

  const toggleFav = (e, plantName) => {
    e.stopPropagation()
    setFavs(prev => {
      const next = new Set(prev)
      next.has(plantName) ? next.delete(plantName) : next.add(plantName)
      saveFavs(next)
      return next
    })
  }

  const filtered = DISCOVER.filter(p => {
    if (cat === 'favs') return favs.has(p.name)
    if (cat !== 'all' && !p.cats.includes(cat)) return false
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const featured = DISCOVER[0]
  const trending  = DISCOVER.slice(1, 4)

  const favsLabel = favs.size > 0
    ? t('discover.favsCount', { count: favs.size })
    : t('discover.favs')

  const allCategories = [{ id: 'favs', label: favsLabel }, ...CATEGORIES]

  const resultsLabel = cat === 'all' && !query
    ? t('discover.allPlants')
    : filtered.length === 1
      ? t('discover.results.one')
      : t('discover.results.many', { count: filtered.length })

  return (
    <ScreenShell>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
        <AppHeader title={t('discover.title')} subtitle={t('discover.subtitle')} />

        {/* Search */}
        <div style={{ padding: '4px 20px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#fff', borderRadius: 16, padding: '12px 14px',
            border: `0.5px solid ${T.line}`,
          }}>
            <Icon name="search" size={18} color={T.ink3} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('discover.search')}
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 15, color: T.ink, fontFamily: 'inherit', letterSpacing: -0.2,
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 2,
                display: 'flex', alignItems: 'center',
              }}>
                <Icon name="close" size={16} color={T.ink3} />
              </button>
            )}
            <button style={{
              width: 30, height: 30, borderRadius: 10, background: T.greenPale,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="filter" size={16} color={T.green} />
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div style={{
          display: 'flex', gap: 8, padding: '16px 20px 4px',
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {allCategories.map(c => {
            const active = cat === c.id
            return (
              <button key={c.id} onClick={() => setCat(c.id)} style={{
                padding: '8px 14px', borderRadius: 999,
                background: active ? T.green : '#fff',
                color: active ? '#fff' : T.ink2,
                border: active ? 'none' : `0.5px solid ${T.line}`,
                fontSize: 13, fontWeight: 600, letterSpacing: -0.1,
                cursor: 'pointer', fontFamily: 'inherit',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>{c.label}</button>
            )
          })}
        </div>

        {/* Featured + Trending */}
        {cat === 'all' && !query && (
          <>
            <div style={{ padding: '16px 20px 0' }}>
              <div style={{
                borderRadius: 24, overflow: 'hidden',
                background: `linear-gradient(135deg, oklch(0.95 0.05 150), oklch(0.88 0.07 150))`,
                padding: 20, position: 'relative', minHeight: 180,
                border: `0.5px solid ${T.line}`,
              }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'inline-block', padding: '4px 10px', borderRadius: 999,
                      background: '#fff', color: T.greenDark,
                      fontSize: 11, fontWeight: 650, letterSpacing: 0.4, marginBottom: 10,
                    }}>
                      {t('discover.featured')}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: T.ink, letterSpacing: -0.5, marginBottom: 4 }}>
                      {featured.name}
                    </div>
                    <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.45, marginBottom: 14 }}>
                      {t('discover.featuredDesc')}
                    </div>
                    <button
                      onClick={() => onAddFromDiscover?.(featured)}
                      style={{
                        padding: '10px 18px', borderRadius: 999,
                        background: T.ink, color: '#fff',
                        border: 'none', cursor: 'pointer',
                        fontSize: 13, fontWeight: 600, letterSpacing: -0.1,
                        fontFamily: 'inherit',
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                      }}>
                      {t('discover.add')}
                      <Icon name="arrowRight" size={14} color="#fff" strokeWidth={2.2} />
                    </button>
                  </div>
                  <PlantImg letter={featured.letter} hue={featured.hue} size={110} radius={18} />
                </div>
              </div>
            </div>

            <SectionHeader title={t('discover.trending')} action={t('discover.more')} />
            <div style={{
              display: 'flex', gap: 12, padding: '0 20px 8px',
              overflowX: 'auto', scrollbarWidth: 'none',
            }}>
              {trending.map(p => (
                <div key={p.id} onClick={() => onAddFromDiscover?.(p)} style={{
                  minWidth: 160, background: '#fff', borderRadius: 20, padding: 12,
                  border: `0.5px solid ${T.line}`, cursor: 'pointer',
                }}>
                  <PlantImg letter={p.letter} hue={p.hue} size={136} radius={14} style={{ width: '100%' }} />
                  <div style={{ padding: '10px 4px 4px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: -0.2, marginBottom: 2 }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 11, color: T.ink3, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Icon name="sun" size={11} />
                      {p.light}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Results grid */}
        <SectionHeader
          title={resultsLabel}
          action={cat !== 'all' ? t('discover.sort') : null}
        />

        {filtered.length === 0 ? (
          <div style={{ padding: '32px 20px', textAlign: 'center', color: T.ink3 }}>
            <Icon name="search" size={32} color={T.ink3} strokeWidth={1.5} />
            <div style={{ marginTop: 8, fontSize: 14 }}>{t('discover.noResults')}</div>
          </div>
        ) : (
          <div style={{
            padding: '0 20px 20px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
          }}>
            {filtered.map(p => (
              <div key={p.id} onClick={() => onAddFromDiscover?.(p)} style={{
                background: '#fff', borderRadius: 20, padding: 12,
                border: `0.5px solid ${T.line}`,
                display: 'flex', flexDirection: 'column',
                cursor: 'pointer', position: 'relative',
              }}>
                <button
                  onClick={e => toggleFav(e, p.name)}
                  style={{
                    position: 'absolute', top: 18, right: 18, zIndex: 2,
                    width: 28, height: 28, borderRadius: 999,
                    background: favs.has(p.name) ? '#FDECEC' : 'rgba(255,255,255,0.9)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  <Icon name="heart" size={14} color={favs.has(p.name) ? T.danger : T.ink2} />
                </button>
                <PlantImg letter={p.letter} hue={p.hue} size={130} radius={14} style={{ width: '100%' }} />
                <div style={{ padding: '10px 4px 4px' }}>
                  <div style={{ fontSize: 10, color: T.ink3, fontWeight: 600, letterSpacing: 0.3, marginBottom: 3 }}>
                    {p.tag.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, letterSpacing: -0.2, marginBottom: 8, lineHeight: 1.2 }}>
                    {p.name}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 600,
                      padding: '3px 7px', borderRadius: 6,
                      background: T.greenPale, color: T.green,
                      letterSpacing: -0.1,
                    }}>{p.diff}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 500,
                      padding: '3px 7px', borderRadius: 6,
                      background: T.bg, color: T.ink2,
                      display: 'inline-flex', alignItems: 'center', gap: 3,
                    }}>
                      <Icon name="sun" size={10} />{p.light}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScreenShell>
  )
}
