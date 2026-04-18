import { T } from '../tokens.js'

export function PrimaryBtn({ children, onClick, disabled, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', height: 52, borderRadius: 16,
      background: disabled ? '#D9DCD8' : T.green,
      color: '#fff', border: 'none',
      fontSize: 16, fontWeight: 600, letterSpacing: -0.2,
      cursor: disabled ? 'default' : 'pointer',
      fontFamily: 'inherit',
      boxShadow: disabled ? 'none' : `0 4px 12px ${T.green}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      ...style,
    }}>{children}</button>
  )
}

export function GhostBtn({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      height: 52, padding: '0 24px', borderRadius: 16,
      background: T.greenLight, color: T.greenDark, border: 'none',
      fontSize: 16, fontWeight: 600, letterSpacing: -0.2,
      cursor: 'pointer', fontFamily: 'inherit',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      ...style,
    }}>{children}</button>
  )
}
