import { T } from '../tokens.jsx'

export function AppHeader({ title, subtitle, right, left }) {
  return (
    <div style={{
      padding: '56px 20px 12px',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      gap: 12, flexShrink: 0,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {subtitle && (
          <div style={{ fontSize: 13, color: T.ink3, fontWeight: 500, marginBottom: 2, letterSpacing: -0.1 }}>
            {subtitle}
          </div>
        )}
        <div style={{ fontSize: 28, fontWeight: 700, color: T.ink, letterSpacing: -0.8, lineHeight: 1.1 }}>
          {title}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {left}
        {right}
      </div>
    </div>
  )
}
