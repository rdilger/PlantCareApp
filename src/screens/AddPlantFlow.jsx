import { useState } from 'react'
import { T, Icon, PlantImg } from '../tokens.jsx'
import { PrimaryBtn } from '../components/Buttons.jsx'
import { ROOMS, LIGHTS } from '../data.js'
import { useLocale } from '../i18n/LocaleContext.jsx'

const SPECIES_SUGGESTIONS = [
  'Monstera Deliciosa', 'Ficus Lyrata', 'Calathea Orbifolia',
  'Pothos', 'Sansevieria', 'Aloe Vera',
]

function StepType({ data, setData }) {
  const { t } = useLocale()
  const options = [
    { id: 'scan',   icon: 'camera',  titleKey: 'add.type.scan.title',   descKey: 'add.type.scan.desc' },
    { id: 'search', icon: 'search',  titleKey: 'add.type.search.title', descKey: 'add.type.search.desc' },
    { id: 'custom', icon: 'sparkle', titleKey: 'add.type.custom.title', descKey: 'add.type.custom.desc' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map(o => {
        const active = data.type === o.id
        return (
          <button key={o.id} onClick={() => setData(d => ({ ...d, type: o.id }))} style={{
            padding: 16, borderRadius: 20, textAlign: 'left',
            background: active ? T.greenPale : '#fff',
            border: `1.5px solid ${active ? T.green : T.line}`,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: active ? T.green : T.greenLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name={o.icon} size={22} color={active ? '#fff' : T.green} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, letterSpacing: -0.2, marginBottom: 2 }}>
                {t(o.titleKey)}
              </div>
              <div style={{ fontSize: 13, color: T.ink3 }}>{t(o.descKey)}</div>
            </div>
            <div style={{
              width: 22, height: 22, borderRadius: 999,
              border: `1.5px solid ${active ? T.green : T.line}`,
              background: active ? T.green : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {active && <Icon name="check" size={14} color="#fff" strokeWidth={3} />}
            </div>
          </button>
        )
      })}
    </div>
  )
}

function StepDetails({ data, setData }) {
  const { t } = useLocale()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Preview */}
      <div style={{
        padding: 20, borderRadius: 20,
        background: T.greenPale, border: `0.5px solid ${T.greenLight}`,
        display: 'flex', gap: 14, alignItems: 'center',
      }}>
        <PlantImg letter={(data.name[0] || '?').toUpperCase()} hue={148} size={64} radius={16} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: T.greenDark, fontWeight: 600, letterSpacing: 0.3, marginBottom: 3 }}>
            PREVIEW
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: T.ink, letterSpacing: -0.3 }}>
            {data.name || t('add.preview.name')}
          </div>
        </div>
      </div>

      {/* Name */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, color: T.ink2, letterSpacing: -0.1, marginBottom: 8, display: 'block' }}>
          {t('add.label.name')}
        </label>
        <input
          value={data.name}
          onChange={e => setData(d => ({ ...d, name: e.target.value }))}
          autoFocus
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '14px 16px', borderRadius: 14,
            background: T.bg, border: `1.5px solid ${T.line}`,
            fontSize: 16, color: T.ink, fontFamily: 'inherit',
            outline: 'none', letterSpacing: -0.2,
          }}
        />
      </div>

      {/* Species */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, color: T.ink2, letterSpacing: -0.1, marginBottom: 8, display: 'block' }}>
          {t('add.label.species')}
        </label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SPECIES_SUGGESTIONS.map(s => {
            const active = data.species === s
            return (
              <button key={s} onClick={() => setData(d => ({ ...d, species: active ? '' : s }))} style={{
                padding: '8px 12px', borderRadius: 10,
                background: active ? T.greenPale : '#fff',
                border: `1px solid ${active ? T.green : T.line}`,
                fontSize: 13, color: active ? T.greenDark : T.ink2, fontWeight: active ? 600 : 500,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{s}</button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StepLocation({ data, setData }) {
  const { t } = useLocale()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Room */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, color: T.ink2, letterSpacing: -0.1, marginBottom: 10, display: 'block' }}>
          {t('detail.label.room')}
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ROOMS.map(r => {
            const active = data.room === r
            return (
              <button key={r} onClick={() => setData(d => ({ ...d, room: r }))} style={{
                padding: '10px 14px', borderRadius: 999,
                background: active ? T.green : '#fff',
                color: active ? '#fff' : T.ink2,
                border: active ? 'none' : `1px solid ${T.line}`,
                fontSize: 13, fontWeight: 600, letterSpacing: -0.1,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{r}</button>
            )
          })}
        </div>
      </div>

      {/* Light */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, color: T.ink2, letterSpacing: -0.1, marginBottom: 10, display: 'block' }}>
          {t('detail.label.light')}
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LIGHTS.map(l => {
            const active = data.light === l.id
            return (
              <button key={l.id} onClick={() => setData(d => ({ ...d, light: l.id }))} style={{
                padding: 14, borderRadius: 16, textAlign: 'left',
                background: active ? T.greenPale : '#fff',
                border: `1.5px solid ${active ? T.green : T.line}`,
                cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: active ? T.green : T.greenLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon name="sun" size={20} color={active ? '#fff' : T.green} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, letterSpacing: -0.2, marginBottom: 2 }}>
                    {l.label}
                  </div>
                  <div style={{ fontSize: 12, color: T.ink3, lineHeight: 1.3 }}>{l.desc}</div>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: 999,
                  border: `1.5px solid ${active ? T.green : T.line}`,
                  background: active ? T.green : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {active && <Icon name="check" size={12} color="#fff" strokeWidth={3} />}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StepCare({ data, setData }) {
  const { t } = useLocale()
  const lightLabel = LIGHTS.find(l => l.id === data.light)?.label || '—'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Frequency */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: T.ink2, letterSpacing: -0.1 }}>
            {t('add.frequency.label')}
          </label>
          <span style={{ fontSize: 20, fontWeight: 700, color: T.green, letterSpacing: -0.4 }}>
            {t('add.frequency.value', { count: data.frequency })}
          </span>
        </div>
        <div style={{ padding: '12px 0' }}>
          <input
            type="range" min="2" max="21" value={data.frequency}
            onChange={e => setData(d => ({ ...d, frequency: Number(e.target.value) }))}
            style={{ width: '100%', accentColor: T.green }}
          />
        </div>
      </div>

      {/* Reminder time */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, color: T.ink2, letterSpacing: -0.1, marginBottom: 10, display: 'block' }}>
          {t('add.reminder.label')}
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          {['07:00', '08:00', '12:00', '18:00'].map(time => {
            const active = data.reminderTime === time
            return (
              <button key={time} onClick={() => setData(d => ({ ...d, reminderTime: time }))} style={{
                flex: 1, padding: '14px 0', borderRadius: 14,
                background: active ? T.ink : '#fff',
                color: active ? '#fff' : T.ink2,
                border: active ? 'none' : `1px solid ${T.line}`,
                fontSize: 14, fontWeight: 600, letterSpacing: -0.2,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{time}</button>
            )
          })}
        </div>
      </div>

      {/* Summary */}
      <div style={{
        padding: 14, borderRadius: 16,
        background: T.bg, border: `0.5px solid ${T.line}`,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', rowGap: 6, columnGap: 12, fontSize: 13 }}>
          <span style={{ color: T.ink3 }}>{t('add.summary.name')}</span>
          <span style={{ color: T.ink, fontWeight: 550 }}>{data.name || '—'}</span>
          <span style={{ color: T.ink3 }}>{t('add.summary.room')}</span>
          <span style={{ color: T.ink, fontWeight: 550 }}>{data.room || '—'}</span>
          <span style={{ color: T.ink3 }}>{t('add.summary.frequency')}</span>
          <span style={{ color: T.ink, fontWeight: 550 }}>{t('add.summary.frequencyVal', { count: data.frequency })}</span>
          <span style={{ color: T.ink3 }}>{t('add.summary.reminder')}</span>
          <span style={{ color: T.ink, fontWeight: 550 }}>{t('add.summary.reminderVal', { time: data.reminderTime })}</span>
        </div>
      </div>
    </div>
  )
}

export function AddPlantFlow({ onComplete, onCancel, initialSpecies = null }) {
  const { t } = useLocale()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    type: initialSpecies ? 'search' : null,
    name: initialSpecies ? initialSpecies.split(' ')[0] : '',
    species: initialSpecies || '',
    room: null,
    light: null,
    frequency: 7,
    reminderTime: '08:00',
  })

  const canNext = [
    data.type !== null,
    data.name.trim().length > 0,
    data.room !== null && data.light !== null,
    true,
  ][step]

  const next = () => { if (step < 3) setStep(step + 1); else onComplete(data) }
  const prev = () => { if (step === 0) onCancel(); else setStep(step - 1) }

  const stepTitles = [0, 1, 2, 3].map(i => ({
    title: t(`add.steps.${i}.title`),
    subtitle: t(`add.steps.${i}.subtitle`),
  }))

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(15,25,21,0.4)',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div style={{
        width: '100%', maxWidth: 480, margin: '0 auto',
        background: '#fff',
        borderRadius: '28px 28px 0 0',
        maxHeight: '94vh',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }} />
        </div>

        {/* Top bar */}
        <div style={{
          padding: '8px 16px 8px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button onClick={prev} style={{
            width: 40, height: 40, borderRadius: 14,
            background: T.bg, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={step === 0 ? 'close' : 'chevronLeft'} size={20} color={T.ink2} />
          </button>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink3, letterSpacing: -0.1 }}>
            {t('add.step', { step: step + 1 })}
          </div>
          <div style={{ width: 40 }} />
        </div>

        {/* Progress bar */}
        <div style={{ padding: '0 20px 20px', display: 'flex', gap: 6 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 999,
              background: i <= step ? T.green : T.line,
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: T.ink, letterSpacing: -0.6, lineHeight: 1.15, marginBottom: 6 }}>
              {stepTitles[step].title}
            </div>
            <div style={{ fontSize: 14, color: T.ink3, letterSpacing: -0.1 }}>
              {stepTitles[step].subtitle}
            </div>
          </div>

          {step === 0 && <StepType data={data} setData={setData} />}
          {step === 1 && <StepDetails data={data} setData={setData} />}
          {step === 2 && <StepLocation data={data} setData={setData} />}
          {step === 3 && <StepCare data={data} setData={setData} />}

          <div style={{ height: 140 }} />
        </div>

        {/* Sticky footer */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          padding: '12px 20px 32px',
          background: 'linear-gradient(to top, #fff 70%, rgba(255,255,255,0))',
        }}>
          <PrimaryBtn onClick={next} disabled={!canNext}>
            {step === 3 ? t('add.finish') : t('add.next')}
            {step < 3 && <Icon name="arrowRight" size={18} color="#fff" strokeWidth={2.2} />}
          </PrimaryBtn>
        </div>
      </div>
    </div>
  )
}
