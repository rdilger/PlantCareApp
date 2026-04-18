import { T } from '../tokens.js'

export function SectionHeader({ title, action, onAction }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '20px 20px 12px',
    }}>
      <div style={{ fontSize: 17, fontWeight: 650, color: T.ink, letterSpacing: -0.4 }}>{title}</div>
      {action && (
        <button onClick={onAction} style={{
          background: 'none', border: 'none', color: T.green,
          fontSize: 14, fontWeight: 550, cursor: 'pointer', fontFamily: 'inherit', padding: 0,
        }}>{action}</button>
      )}
    </div>
  )
}
