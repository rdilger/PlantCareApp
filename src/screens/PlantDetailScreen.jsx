import { useState, useRef } from 'react'
import { T, Icon, PlantImg } from '../tokens.jsx'
import { WaterStatus } from '../components/WaterStatus.jsx'
import { PrimaryBtn } from '../components/Buttons.jsx'
import { ROOMS, LIGHTS } from '../data.js'

function germanDate(isoDate) {
  if (!isoDate) return '—'
  return new Date(isoDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
}

function addDays(isoDate, days) {
  if (!isoDate) return '—'
  const d = new Date(isoDate)
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })
}

export function PlantDetailScreen({ plant, getStatus, onWater, onUpdate, onRemove, onClose, onAddNote, onRemoveNote }) {
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: plant.name,
    species: plant.species,
    room: plant.room,
    light: plant.light,
    frequency: plant.frequency,
    reminderTime: plant.reminderTime,
  })
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [noteText, setNoteText] = useState('')
  const noteInputRef = useRef(null)

  const { status, waterIn, lastWatered } = getStatus(plant)

  const handleSave = () => {
    onUpdate(plant.id, editData)
    setEditing(false)
  }

  const handleWater = () => {
    onWater(plant.id)
  }

  const handleDelete = () => {
    onRemove(plant.id)
    onClose()
  }

  const lightLabel = LIGHTS.find(l => l.id === (editing ? editData.light : plant.light))?.label || '—'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: T.bg,
      display: 'flex', flexDirection: 'column',
      maxWidth: 480, margin: '0 auto',
    }}>
      {/* Top bar */}
      <div style={{
        padding: '56px 20px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        flexShrink: 0,
      }}>
        <button onClick={onClose} style={{
          width: 40, height: 40, borderRadius: 14,
          background: '#fff', border: `0.5px solid ${T.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0,
        }}>
          <Icon name="chevronLeft" size={20} color={T.ink2} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: T.ink, letterSpacing: -0.5, lineHeight: 1.2 }}>
            {plant.name}
          </div>
          {plant.species && plant.species !== plant.name && (
            <div style={{ fontSize: 13, color: T.ink3, marginTop: 1 }}>{plant.species}</div>
          )}
        </div>
        <button onClick={() => { setEditing(e => !e); setEditData({ name: plant.name, species: plant.species, room: plant.room, light: plant.light, frequency: plant.frequency, reminderTime: plant.reminderTime }) }} style={{
          height: 36, padding: '0 14px', borderRadius: 12,
          background: editing ? T.green : '#fff',
          color: editing ? '#fff' : T.ink2,
          border: `0.5px solid ${editing ? T.green : T.line}`,
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          {editing ? 'Abbrechen' : 'Bearbeiten'}
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>

        {/* Hero */}
        <div style={{ padding: '0 20px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
          <PlantImg letter={plant.letter} hue={plant.hue} size={88} radius={20} />
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 999,
              background: '#fff', border: `0.5px solid ${T.line}`,
              fontSize: 12, color: T.ink2, fontWeight: 500, marginBottom: 10,
            }}>
              <Icon name="location" size={12} color={T.ink3} />
              {plant.room || '—'}
            </div>
            <WaterStatus status={status} days={Math.max(0, waterIn)} />
          </div>
        </div>

        {/* Status card */}
        <div style={{ margin: '0 20px 16px', padding: 16, borderRadius: 20, background: '#fff', border: `0.5px solid ${T.line}` }}>
          <div style={{ fontSize: 11, color: T.ink3, fontWeight: 600, letterSpacing: 0.3, marginBottom: 12 }}>
            BEWÄSSERUNG
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: T.ink3, marginBottom: 3 }}>Zuletzt gegossen</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{germanDate(lastWatered)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: T.ink3, marginBottom: 3 }}>Nächstes Mal</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: waterIn <= 0 ? T.danger : T.ink }}>
                {waterIn <= 0 ? 'Heute' : addDays(lastWatered, plant.frequency)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: T.ink3, marginBottom: 3 }}>Rhythmus</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>Alle {plant.frequency} Tage</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: T.ink3, marginBottom: 3 }}>Erinnerung</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{plant.reminderTime} Uhr</div>
            </div>
          </div>
        </div>

        {/* Care info (view mode) / Edit form */}
        {!editing ? (
          <div style={{ margin: '0 20px 16px', padding: 16, borderRadius: 20, background: '#fff', border: `0.5px solid ${T.line}` }}>
            <div style={{ fontSize: 11, color: T.ink3, fontWeight: 600, letterSpacing: 0.3, marginBottom: 12 }}>
              STANDORT & LICHT
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: T.ink3, marginBottom: 3 }}>Raum</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{plant.room || '—'}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: T.ink3, marginBottom: 3 }}>Licht</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{lightLabel}</div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ margin: '0 20px 16px', padding: 16, borderRadius: 20, background: '#fff', border: `1.5px solid ${T.green}` }}>
            <div style={{ fontSize: 11, color: T.greenDark, fontWeight: 600, letterSpacing: 0.3, marginBottom: 16 }}>
              BEARBEITEN
            </div>

            {/* Name */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 6, display: 'block' }}>Name</label>
              <input
                value={editData.name}
                onChange={e => setEditData(d => ({ ...d, name: e.target.value }))}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '12px 14px', borderRadius: 12,
                  background: T.bg, border: `1.5px solid ${T.line}`,
                  fontSize: 15, color: T.ink, fontFamily: 'inherit', outline: 'none',
                }}
              />
            </div>

            {/* Room */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 8, display: 'block' }}>Raum</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {ROOMS.map(r => {
                  const active = editData.room === r
                  return (
                    <button key={r} onClick={() => setEditData(d => ({ ...d, room: r }))} style={{
                      padding: '8px 12px', borderRadius: 999,
                      background: active ? T.green : T.bg,
                      color: active ? '#fff' : T.ink2,
                      border: active ? 'none' : `1px solid ${T.line}`,
                      fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    }}>{r}</button>
                  )
                })}
              </div>
            </div>

            {/* Light */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 8, display: 'block' }}>Licht</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {LIGHTS.map(l => {
                  const active = editData.light === l.id
                  return (
                    <button key={l.id} onClick={() => setEditData(d => ({ ...d, light: l.id }))} style={{
                      flex: 1, padding: '10px 6px', borderRadius: 12, textAlign: 'center',
                      background: active ? T.greenPale : T.bg,
                      border: `1.5px solid ${active ? T.green : T.line}`,
                      fontSize: 11, fontWeight: 600, color: active ? T.greenDark : T.ink2,
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}>{l.label.split(' ')[0]}</button>
                  )
                })}
              </div>
            </div>

            {/* Frequency */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.ink2 }}>Gießrhythmus</label>
                <span style={{ fontSize: 15, fontWeight: 700, color: T.green }}>Alle {editData.frequency} Tage</span>
              </div>
              <input
                type="range" min="2" max="21" value={editData.frequency}
                onChange={e => setEditData(d => ({ ...d, frequency: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: T.green }}
              />
            </div>

            <PrimaryBtn onClick={handleSave} disabled={!editData.name.trim()}>
              Änderungen speichern
            </PrimaryBtn>
          </div>
        )}

        {/* Water now button */}
        {!editing && (
          <div style={{ padding: '0 20px 16px' }}>
            <button onClick={handleWater} style={{
              width: '100%', height: 52, borderRadius: 16,
              background: status === 'overdue' || status === 'due'
                ? T.green
                : '#fff',
              color: status === 'overdue' || status === 'due' ? '#fff' : T.green,
              border: `1.5px solid ${T.green}`,
              fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: status === 'overdue' || status === 'due' ? `0 4px 12px ${T.green}40` : 'none',
            }}>
              <Icon name="droplet" size={20} color={status === 'overdue' || status === 'due' ? '#fff' : T.green} strokeWidth={2} />
              Jetzt gießen
            </button>
          </div>
        )}

        {/* Journal / health notes */}
        {!editing && (
          <div style={{ margin: '0 20px 16px', padding: 16, borderRadius: 20, background: '#fff', border: `0.5px solid ${T.line}` }}>
            <div style={{ fontSize: 11, color: T.ink3, fontWeight: 600, letterSpacing: 0.3, marginBottom: 12 }}>
              PFLEGETAGEBUCH
            </div>
            {(plant.notes || []).length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                {[...(plant.notes || [])].reverse().map(note => (
                  <div key={note.id} style={{
                    background: T.bg, borderRadius: 12, padding: '10px 12px',
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: T.ink3, marginBottom: 3 }}>
                        {germanDate(note.date)}
                      </div>
                      <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.4 }}>{note.text}</div>
                    </div>
                    <button
                      onClick={() => onRemoveNote?.(plant.id, note.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }}>
                      <Icon name="close" size={14} color={T.ink3} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                ref={noteInputRef}
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && noteText.trim()) {
                    onAddNote?.(plant.id, noteText.trim())
                    setNoteText('')
                  }
                }}
                placeholder="Beobachtung hinzufügen…"
                style={{
                  flex: 1, padding: '10px 12px', borderRadius: 10,
                  background: T.bg, border: `1px solid ${T.line}`,
                  fontSize: 13, color: T.ink, fontFamily: 'inherit', outline: 'none',
                }}
              />
              <button
                onClick={() => {
                  if (!noteText.trim()) return
                  onAddNote?.(plant.id, noteText.trim())
                  setNoteText('')
                }}
                disabled={!noteText.trim()}
                style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: noteText.trim() ? T.green : T.line,
                  border: 'none', cursor: noteText.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                <Icon name="arrowRight" size={18} color="#fff" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}

        {/* Delete */}
        {!editing && (
          <div style={{ padding: '0 20px 20px' }}>
            {confirmDelete ? (
              <div style={{
                padding: 16, borderRadius: 16, background: '#FDECEC',
                border: `1px solid ${T.danger}22`,
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.danger }}>
                  Pflanze wirklich löschen?
                </div>
                <div style={{ fontSize: 13, color: T.ink2 }}>
                  Diese Aktion kann nicht rückgängig gemacht werden.
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={handleDelete} style={{
                    flex: 1, height: 44, borderRadius: 12,
                    background: T.danger, color: '#fff', border: 'none',
                    fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  }}>Löschen</button>
                  <button onClick={() => setConfirmDelete(false)} style={{
                    flex: 1, height: 44, borderRadius: 12,
                    background: '#fff', color: T.ink2, border: `1px solid ${T.line}`,
                    fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  }}>Abbrechen</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setConfirmDelete(true)} style={{
                width: '100%', height: 44, borderRadius: 12,
                background: 'transparent', color: T.ink3,
                border: `0.5px solid ${T.line}`,
                fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <Icon name="trash" size={16} color={T.ink3} />
                Pflanze entfernen
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
