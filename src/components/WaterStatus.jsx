import { T } from '../tokens.jsx'

export function WaterStatus({ status, days }) {
  const cfg = {
    overdue: { bg: '#FDECEC', fg: T.danger,   label: 'Überfällig',                  dot: T.danger },
    due:     { bg: '#E7F4FA', fg: '#1E7FB3',   label: 'Heute gießen',                dot: '#1E7FB3' },
    soon:    { bg: '#FFF4E3', fg: '#B57317',   label: `In ${days} Tag${days===1?'':'en'}`, dot: '#D89538' },
    ok:      { bg: T.greenLight, fg: T.greenDark, label: days <= 1 ? 'Morgen' : `In ${days} Tagen`, dot: T.green },
  }[status] || {}

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: cfg.bg, color: cfg.fg,
      fontSize: 12, fontWeight: 550, letterSpacing: -0.1,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: cfg.dot }} />
      {cfg.label}
    </div>
  )
}
