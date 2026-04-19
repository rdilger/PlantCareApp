import { useState } from 'react'
import { usePlants } from './hooks/usePlants.js'
import { TabBar } from './components/TabBar.jsx'
import { HomeScreen } from './screens/HomeScreen.jsx'
import { CalendarScreen } from './screens/CalendarScreen.jsx'
import { DiscoverScreen } from './screens/DiscoverScreen.jsx'
import { AddPlantFlow } from './screens/AddPlantFlow.jsx'
import { PlantDetailScreen } from './screens/PlantDetailScreen.jsx'
import { T } from './tokens.jsx'

export default function App() {
  const { plants, wateredMap, addPlant, removePlant, waterPlant, updatePlant, getStatus } = usePlants()
  const [activeTab, setActiveTab] = useState('home')
  const [showAdd, setShowAdd] = useState(false)
  const [addInitialSpecies, setAddInitialSpecies] = useState(null)
  const [selectedPlant, setSelectedPlant] = useState(null)

  const handleTabChange = (id) => {
    if (id === 'add') {
      setAddInitialSpecies(null)
      setShowAdd(true)
    } else {
      setActiveTab(id)
    }
  }

  const handleAddComplete = (data) => {
    addPlant(data)
    setShowAdd(false)
    setActiveTab('home')
  }

  const handleAddFromDiscover = (plant) => {
    setAddInitialSpecies(plant.name)
    setShowAdd(true)
  }

  return (
    <div style={{
      width: '100%', maxWidth: 480, height: '100dvh',
      position: 'relative', overflow: 'hidden',
      background: T.bg,
      boxShadow: '0 0 60px rgba(0,0,0,0.15)',
    }}>
      {/* Active screen */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {activeTab === 'home' && (
          <HomeScreen
            plants={plants}
            getStatus={getStatus}
            onWater={waterPlant}
            onAddPlant={() => { setAddInitialSpecies(null); setShowAdd(true) }}
            onOpenPlant={(plant) => setSelectedPlant(plant)}
          />
        )}
        {activeTab === 'calendar' && (
          <CalendarScreen
            plants={plants}
            wateredMap={wateredMap}
            getStatus={getStatus}
            onWater={waterPlant}
          />
        )}
        {activeTab === 'discover' && (
          <DiscoverScreen
            onAddFromDiscover={handleAddFromDiscover}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileScreen plants={plants} onRemovePlant={removePlant} />
        )}

        {/* Tab bar overlaid at bottom */}
        <TabBar active={activeTab} onChange={handleTabChange} />
      </div>

      {/* Add plant overlay */}
      {showAdd && (
        <AddPlantFlow
          initialSpecies={addInitialSpecies}
          onComplete={handleAddComplete}
          onCancel={() => setShowAdd(false)}
        />
      )}

      {/* Plant detail overlay */}
      {selectedPlant && (
        <PlantDetailScreen
          plant={plants.find(p => p.id === selectedPlant.id) ?? selectedPlant}
          getStatus={getStatus}
          onWater={waterPlant}
          onUpdate={updatePlant}
          onRemove={removePlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  )
}

// Simple profile/settings screen
function ProfileScreen({ plants, onRemovePlant }) {
  const [confirmId, setConfirmId] = useState(null)

  return (
    <div style={{ height: '100%', background: T.bg, overflowY: 'auto', paddingBottom: 120 }}>
      <div style={{ padding: '56px 20px 12px' }}>
        <div style={{ fontSize: 13, color: T.ink3, fontWeight: 500, marginBottom: 2 }}>Einstellungen</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: T.ink, letterSpacing: -0.8 }}>Profil</div>
      </div>

      <div style={{ padding: '8px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink3, letterSpacing: 0.3, marginBottom: 12 }}>
          MEINE PFLANZEN ({plants.length})
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {plants.map(p => (
            <div key={p.id} style={{
              background: '#fff', borderRadius: 16, padding: '12px 14px',
              border: `0.5px solid ${T.line}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `oklch(0.92 0.06 ${p.hue})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 600, color: `oklch(0.45 0.1 ${p.hue})`,
                flexShrink: 0,
              }}>{p.letter}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, letterSpacing: -0.2 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: T.ink3 }}>{p.room} · alle {p.frequency} Tage</div>
              </div>
              {confirmId === p.id ? (
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => { onRemovePlant(p.id); setConfirmId(null) }}
                    style={{
                      padding: '6px 10px', borderRadius: 8,
                      background: T.danger, color: '#fff', border: 'none',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    }}>Löschen</button>
                  <button
                    onClick={() => setConfirmId(null)}
                    style={{
                      padding: '6px 10px', borderRadius: 8,
                      background: T.line, color: T.ink2, border: 'none',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    }}>Abbrechen</button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmId(p.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                    color: T.ink3,
                  }}>
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path d="M1 4h14M6 4V2h4v2M2 4l1 12h10l1-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
