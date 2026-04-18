import { T, Icon } from '../tokens.jsx'

export function IconBtn({ icon, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: 14,
      background: '#fff', border: `0.5px solid ${T.line}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', position: 'relative',
      boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    }}>
      <Icon name={icon} size={20} color={T.ink2} />
      {badge && (
        <span style={{
          position: 'absolute', top: 6, right: 7,
          width: 8, height: 8, borderRadius: 999,
          background: T.green, border: '1.5px solid #fff',
        }} />
      )}
    </button>
  )
}
