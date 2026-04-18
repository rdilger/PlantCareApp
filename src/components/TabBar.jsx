import { T, Icon } from '../tokens.jsx'

const TABS = [
  { id: 'home',     icon: 'home',     label: 'Pflanzen' },
  { id: 'calendar', icon: 'calendar', label: 'Kalender' },
  { id: 'add',      icon: 'plus',     label: '',         fab: true },
  { id: 'discover', icon: 'search',   label: 'Entdecken' },
  { id: 'profile',  icon: 'user',     label: 'Profil' },
]

export function TabBar({ active, onChange }) {
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
      {TABS.map(t => {
        const isActive = active === t.id
        if (t.fab) {
          return (
            <button key={t.id} onClick={() => onChange(t.id)} style={{
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
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 8px', color: isActive ? T.green : T.ink3,
            fontFamily: 'inherit',
          }}>
            <Icon name={t.icon} size={22} strokeWidth={isActive ? 2.2 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500, letterSpacing: -0.1 }}>
              {t.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
