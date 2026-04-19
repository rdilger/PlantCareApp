import { useState, useMemo } from 'react'
import { T, Icon, PlantImg } from '../tokens.jsx'
import { ScreenShell } from '../components/ScreenShell.jsx'
import { AppHeader } from '../components/AppHeader.jsx'
import { IconBtn } from '../components/IconBtn.jsx'
import { SectionHeader } from '../components/SectionHeader.jsx'

const GERMAN_MONTHS = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
const GERMAN_DAYS_SHORT = ['Mo','Di','Mi','Do','Fr','Sa','So']

const TYPE_CFG = {
  water: { icon: 'droplet', color: '#1D9E75', bg: '#E8F5EF', label: 'Gießen' },
}

function getNextWaterDates(plant, wateredMap, year, month) {
  const history = wateredMap[plant.id]
  const lastWateredStr = Array.isArray(history) ? history[history.length - 1] : history
  const base = lastWateredStr ? new Date(lastWateredStr) : new Date()
  base.setHours(0, 0, 0, 0)

  const dates = []
  // Walk forward from last watered, collecting all watering dates in this month
  let d = new Date(base)
  d.setDate(d.getDate() + plant.frequency)

  // Go back to find the first occurrence at or before month start
  const monthStart = new Date(year, month, 1)
  while (d > monthStart) {
    d.setDate(d.getDate() - plant.frequency)
  }
  // Now advance forward collecting dates in the month
  while (d < monthStart) {
    d.setDate(d.getDate() + plant.frequency)
  }
  const monthEnd = new Date(year, month + 1, 0)
  while (d <= monthEnd) {
    dates.push(d.getDate())
    d = new Date(d)
    d.setDate(d.getDate() + plant.frequency)
  }
  return dates
}

export function CalendarScreen({ plants, wateredMap, getStatus, onWater }) {
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [selected, setSelected] = useState(now.getDate())
  const [wateredToday, setWateredToday] = useState(new Set())

  const today = now.getDate()
  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth()

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  // Day of week for 1st: 0=Sun → convert to Mon-based (0=Mon)
  const rawFirst = new Date(viewYear, viewMonth, 1).getDay()
  const firstOffset = (rawFirst + 6) % 7 // Mon-based offset

  // Compute task map: { day: [{ plant, type }] }
  const tasksByDay = useMemo(() => {
    const map = {}
    plants.forEach(plant => {
      const dates = getNextWaterDates(plant, wateredMap, viewYear, viewMonth)
      dates.forEach(d => {
        if (!map[d]) map[d] = []
        map[d].push({ plant, type: 'water' })
      })
    })
    return map
  }, [plants, wateredMap, viewYear, viewMonth])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
    setSelected(1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
    setSelected(1)
  }

  const selectedTasks = tasksByDay[selected] || []

  // Build week preview: next 5 days with tasks
  const upcomingDays = useMemo(() => {
    const today = new Date()
    const days = []
    for (let i = 0; i < 14; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() + i)
      if (d.getMonth() === viewMonth && d.getFullYear() === viewYear) {
        const dayNum = d.getDate()
        if (tasksByDay[dayNum] && dayNum !== selected) {
          days.push({ date: dayNum, day: GERMAN_DAYS_SHORT[(d.getDay() + 6) % 7], tasks: tasksByDay[dayNum] })
        }
      }
    }
    return days.slice(0, 4)
  }, [tasksByDay, viewMonth, viewYear, selected])

  const cells = []
  for (let i = 0; i < firstOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <ScreenShell>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
        <AppHeader
          title="Kalender"
          subtitle="Pflegetermine"
          right={<IconBtn icon="plus" />}
        />

        {/* Calendar card */}
        <div style={{
          margin: '8px 20px 0', padding: '16px 18px',
          background: '#fff', borderRadius: 24,
          border: `0.5px solid ${T.line}`,
        }}>
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <Icon name="chevronLeft" size={20} color={T.ink2} />
            </button>
            <div style={{ fontSize: 17, fontWeight: 650, color: T.ink, letterSpacing: -0.3 }}>
              {GERMAN_MONTHS[viewMonth]} {viewYear}
            </div>
            <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <Icon name="chevronRight" size={20} color={T.ink2} />
            </button>
          </div>

          {/* Weekday labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6 }}>
            {GERMAN_DAYS_SHORT.map((w, i) => (
              <div key={i} style={{
                textAlign: 'center', fontSize: 11, fontWeight: 600,
                color: T.ink3, letterSpacing: 0.4,
              }}>{w}</div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {cells.map((d, i) => {
              if (d === null) return <div key={i} style={{ height: 42 }} />
              const dayTasks = tasksByDay[d] || []
              const isSelected = d === selected
              const isToday = isCurrentMonth && d === today

              return (
                <button key={i} onClick={() => setSelected(d)} style={{
                  height: 42, border: 'none', background: 'none',
                  cursor: 'pointer', padding: 0, position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'inherit',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isSelected ? T.green : (isToday ? T.greenLight : 'transparent'),
                    color: isSelected ? '#fff' : (isToday ? T.greenDark : T.ink),
                    fontSize: 14, fontWeight: isToday || isSelected ? 650 : 500,
                    letterSpacing: -0.2, position: 'relative',
                  }}>
                    {d}
                    {dayTasks.length > 0 && (
                      <div style={{
                        position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)',
                        display: 'flex', gap: 2,
                      }}>
                        {dayTasks.slice(0, 3).map((t, ti) => (
                          <span key={ti} style={{
                            width: 4, height: 4, borderRadius: 999,
                            background: isSelected ? 'rgba(255,255,255,0.9)' : TYPE_CFG[t.type].color,
                          }} />
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected day tasks */}
        <div style={{ padding: '8px 20px 0' }}>
          <SectionHeader
            title={`${selected}. ${GERMAN_MONTHS[viewMonth]} · ${selectedTasks.length} ${selectedTasks.length === 1 ? 'Aufgabe' : 'Aufgaben'}`}
          />
          {selectedTasks.length === 0 ? (
            <div style={{
              padding: '32px 20px', textAlign: 'center',
              background: '#fff', borderRadius: 20,
              border: `0.5px solid ${T.line}`,
              color: T.ink3, fontSize: 14,
            }}>
              <Icon name="leaf" size={28} color={T.ink3} strokeWidth={1.5} />
              <div style={{ marginTop: 8 }}>Keine Termine an diesem Tag</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {selectedTasks.map((task, i) => {
                const cfg = TYPE_CFG[task.type]
                const { status } = getStatus(task.plant)
                const overdue = status === 'overdue'
                return (
                  <div key={i} style={{
                    background: '#fff', borderRadius: 18, padding: 14,
                    border: `0.5px solid ${T.line}`,
                    display: 'flex', alignItems: 'center', gap: 14,
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {overdue && (
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: 3, background: T.danger,
                      }} />
                    )}
                    <div style={{
                      width: 44, height: 44, borderRadius: 13,
                      background: cfg.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name={cfg.icon} size={22} color={cfg.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 12, color: cfg.color, fontWeight: 600, letterSpacing: -0.1 }}>
                          {cfg.label.toUpperCase()}
                        </span>
                        {overdue && (
                          <span style={{
                            fontSize: 10, color: T.danger, fontWeight: 600,
                            padding: '2px 6px', borderRadius: 4, background: '#FDECEC',
                          }}>ÜBERFÄLLIG</span>
                        )}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, letterSpacing: -0.3 }}>
                        {task.plant.name}
                      </div>
                      <div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>
                        {task.plant.room} · alle {task.plant.frequency} Tage
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onWater?.(task.plant.id)
                        setWateredToday(prev => new Set([...prev, task.plant.id]))
                      }}
                      style={{
                        width: 36, height: 36, borderRadius: 12,
                        background: wateredToday.has(task.plant.id) ? T.greenLight : T.greenPale,
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                      <Icon name="check" size={18} color={T.green} strokeWidth={2.4} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Upcoming week preview */}
        {upcomingDays.length > 0 && (
          <div style={{ padding: '0 20px' }}>
            <SectionHeader title="Demnächst" action="Alle anzeigen" />
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
              {upcomingDays.map(day => (
                <div key={day.date} onClick={() => setSelected(day.date)} style={{
                  minWidth: 110, background: '#fff', borderRadius: 18, padding: 14,
                  border: `0.5px solid ${T.line}`, cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 11, color: T.ink3, fontWeight: 600, letterSpacing: 0.4, marginBottom: 4 }}>
                    {day.day.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: T.ink, letterSpacing: -0.6, marginBottom: 10 }}>
                    {day.date}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {day.tasks.slice(0, 2).map((t, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: 999, background: TYPE_CFG[t.type].color }} />
                        <span style={{ fontSize: 11, color: T.ink2, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {t.plant.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScreenShell>
  )
}
