import { T, Icon } from '../tokens.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

const TAB_IDS = [
  { id: 'home',     icon: 'home',     key: 'tab.plants' },
  { id: 'calendar', icon: 'calendar', key: 'tab.calendar' },
  { id: 'add',      icon: 'plus',     key: null, fab: true },
  { id: 'discover', icon: 'search',   key: 'tab.discover' },
  { id: 'profile',  icon: 'user',     key: 'tab.profile' },
]

export function TabBar({ active, onChange }) {
  const { t } = useLocale()

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      paddingBottom: 28, paddingTop: 8,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: `0.5px solid ${T.line}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      flexShrink: 0,
    }}>
      {TAB_IDS.map(tab => {
        const isActive = active === tab.id
        if (tab.fab) {
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} style={{
              width: 56, height: 56, borderRadius: 20,
              background: T.green, border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 6px 16px ${T.green}55, 0 2px 4px ${T.green}33`,
              cursor: 'pointer', marginTop: -24,
            }}>
              <Icon name="plus" size={26} color="#fff" strokeWidth={2.4} />
            </button>
          )
        }
        return (
          <button key={tab.id} onClick={() => onChange(tab.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 8px', color: isActive ? T.green : T.ink3,
            fontFamily: 'inherit',
          }}>
            <Icon name={tab.icon} size={22} strokeWidth={isActive ? 2.2 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500, letterSpacing: -0.1 }}>
              {t(tab.key)}
            </span>
          </button>
        )
      })}
    </div>
  )
}
