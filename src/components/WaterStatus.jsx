import { T } from '../tokens.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

export function WaterStatus({ status, days }) {
  const { t } = useLocale()

  const label = {
    overdue: t('water.overdue'),
    due:     t('water.due'),
    soon:    days === 1 ? t('water.soon.one') : t('water.soon', { count: days }),
    ok:      days <= 1  ? t('water.ok.tomorrow') : t('water.ok', { count: days }),
  }[status] ?? ''

  const cfg = {
    overdue: { bg: '#FDECEC', fg: T.danger,     dot: T.danger },
    due:     { bg: '#E7F4FA', fg: '#1E7FB3',    dot: '#1E7FB3' },
    soon:    { bg: '#FFF4E3', fg: '#B57317',    dot: '#D89538' },
    ok:      { bg: T.greenLight, fg: T.greenDark, dot: T.green },
  }[status] || {}

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: cfg.bg, color: cfg.fg,
      fontSize: 12, fontWeight: 550, letterSpacing: -0.1,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: cfg.dot }} />
      {label}
    </div>
  )
}
