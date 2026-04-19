import { useState } from 'react'
import { T, Icon, PlantImg } from '../tokens.jsx'
import { ScreenShell } from '../components/ScreenShell.jsx'
import { AppHeader } from '../components/AppHeader.jsx'
import { IconBtn } from '../components/IconBtn.jsx'
import { WaterStatus } from '../components/WaterStatus.jsx'
import { SectionHeader } from '../components/SectionHeader.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

export function HomeScreen({ plants, getStatus, onWater, onAddPlant, onOpenPlant }) {
  const { t, formatDate } = useLocale()
  const [filter, setFilter] = useState('all')

  const statuses = plants.map(p => ({ ...p, s: getStatus(p) }))

  const filters = [
    { id: 'all',  label: t('home.filter.all'),  count: plants.length },
    { id: 'due',  label: t('home.filter.due'),  count: statuses.filter(p => p.s.status === 'due' || p.s.status === 'overdue').length },
    { id: 'soon', label: t('home.filter.soon'), count: statuses.filter(p => p.s.waterIn <= 3).length },
  ]

  const visible = statuses.filter(p => {
    if (filter === 'due')  return p.s.status === 'due' || p.s.status === 'overdue'
    if (filter === 'soon') return p.s.waterIn <= 3
    return true
  })

  const dueToday  = statuses.filter(p => p.s.status === 'due').length
  const overdue   = statuses.filter(p => p.s.status === 'overdue').length
  const needWater = dueToday + overdue

  const todayStr = formatDate(new Date().toISOString(), { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <ScreenShell>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
        <AppHeader
          subtitle={t('home.subtitle')}
          title={t('home.title')}
          right={<IconBtn icon="bell" badge={needWater > 0} onClick={() => setFilter('due')} />}
        />

        {/* Status summary card */}
        <div style={{
          margin: '8px 20px 0', padding: 20, borderRadius: 24,
          background: `linear-gradient(135deg, ${T.green} 0%, ${T.greenDark} 100%)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -30, top: -30, width: 140, height: 140,
            borderRadius: 999, background: 'rgba(255,255,255,0.08)',
          }} />
          <div style={{
            position: 'absolute', right: 20, bottom: -40, width: 90, height: 90,
            borderRadius: 999, background: 'rgba(255,255,255,0.08)',
          }} />
          <div style={{ fontSize: 13, opacity: 0.85, fontWeight: 500, marginBottom: 4 }}>
            {todayStr}
          </div>
          <div style={{ fontSize: 22, fontWeight: 650, letterSpacing: -0.4, lineHeight: 1.25, marginBottom: 14 }}>
            {needWater === 0
              ? t('home.status.allOk', { count: plants.length })
              : needWater === 1
                ? t('home.status.needWater.one', { count: 1 })
                : t('home.status.needWater.many', { count: needWater })
            }
          </div>
          <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
            {dueToday > 0 && (
              <div style={{
                padding: '8px 14px', borderRadius: 999,
                background: 'rgba(255,255,255,0.18)',
                fontSize: 13, fontWeight: 550,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Icon name="droplet" size={14} strokeWidth={2.2} />
                {t('home.badge.due', { count: dueToday })}
              </div>
            )}
            {overdue > 0 && (
              <div style={{
                padding: '8px 14px', borderRadius: 999,
                background: 'rgba(255,255,255,0.18)',
                fontSize: 13, fontWeight: 550,
              }}>
                {t('home.badge.overdue', { count: overdue })}
              </div>
            )}
            {needWater === 0 && (
              <div style={{
                padding: '8px 14px', borderRadius: 999,
                background: 'rgba(255,255,255,0.18)',
                fontSize: 13, fontWeight: 550,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Icon name="check" size={14} strokeWidth={2.4} />
                {t('home.badge.allOk')}
              </div>
            )}
          </div>
        </div>

        {/* Filter chips */}
        <div style={{
          display: 'flex', gap: 8, padding: '20px 20px 8px',
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {filters.map(f => {
            const active = filter === f.id
            return (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding: '8px 14px', borderRadius: 999,
                background: active ? T.ink : '#fff',
                color: active ? '#fff' : T.ink2,
                border: active ? 'none' : `0.5px solid ${T.line}`,
                fontSize: 13, fontWeight: 600, letterSpacing: -0.1,
                cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 6,
                whiteSpace: 'nowrap',
              }}>
                {f.label}
                <span style={{
                  fontSize: 11, opacity: 0.7,
                  padding: '1px 6px', borderRadius: 999,
                  background: active ? 'rgba(255,255,255,0.22)' : T.bg,
                }}>{f.count}</span>
              </button>
            )
          })}
        </div>

        {/* Plant list */}
        <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visible.length === 0 ? (
            <div style={{
              padding: '40px 20px', textAlign: 'center',
              background: '#fff', borderRadius: 20, border: `0.5px solid ${T.line}`,
              color: T.ink3,
            }}>
              <Icon name="leaf" size={32} color={T.ink3} strokeWidth={1.5} />
              <div style={{ marginTop: 10, fontSize: 14 }}>{t('home.empty')}</div>
            </div>
          ) : visible.map(plant => {
            const { status, waterIn } = plant.s
            return (
              <div key={plant.id} onClick={() => onOpenPlant?.(plant)} style={{
                background: '#fff', borderRadius: 20, padding: 14,
                display: 'flex', gap: 14, alignItems: 'center',
                border: `0.5px solid ${T.line}`,
                cursor: 'pointer',
              }}>
                <PlantImg letter={plant.letter} hue={plant.hue} size={60} radius={14} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, letterSpacing: -0.3, marginBottom: 4 }}>
                    {plant.name}
                    {plant.species && plant.species !== plant.name && (
                      <span style={{ fontSize: 12, color: T.ink3, fontWeight: 400, marginLeft: 6 }}>
                        {plant.species}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: T.ink3, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon name="location" size={12} />
                    {plant.room}
                  </div>
                  <WaterStatus status={status} days={Math.max(0, waterIn)} />
                </div>
                <button onClick={e => { e.stopPropagation(); onWater(plant.id) }} style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: status === 'ok' && waterIn > 0 ? T.greenPale : T.greenLight,
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon
                    name={status === 'ok' && waterIn > 0 ? 'droplet' : 'check'}
                    size={22}
                    color={T.green}
                    strokeWidth={status === 'ok' && waterIn > 0 ? 2 : 2.4}
                  />
                </button>
              </div>
            )
          })}
        </div>

        {/* Tip card */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: 16,
            border: `0.5px solid ${T.line}`,
            display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: T.greenLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="sparkle" size={20} color={T.green} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 2 }}>
                {t('home.tip.title')}
              </div>
              <div style={{ fontSize: 12, color: T.ink3, lineHeight: 1.4 }}>
                {t('home.tip.body')}
              </div>
            </div>
            <Icon name="chevronRight" size={18} color={T.ink3} />
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}
