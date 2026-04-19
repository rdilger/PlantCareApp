import { useState } from 'react'
import { usePlants } from './hooks/usePlants.js'
import { useNotifications } from './hooks/useNotifications.js'
import { TabBar } from './components/TabBar.jsx'
import { HomeScreen } from './screens/HomeScreen.jsx'
import { CalendarScreen } from './screens/CalendarScreen.jsx'
import { DiscoverScreen } from './screens/DiscoverScreen.jsx'
import { AddPlantFlow } from './screens/AddPlantFlow.jsx'
import { PlantDetailScreen } from './screens/PlantDetailScreen.jsx'
import { ProfileScreen } from './screens/ProfileScreen.jsx'
import { T } from './tokens.jsx'

export default function App() {
  const { plants, wateredMap, addPlant, removePlant, waterPlant, updatePlant, addNote, removeNote, getStatus } = usePlants()
  const [activeTab, setActiveTab] = useState('home')
  const [showAdd, setShowAdd] = useState(false)
  const [addInitialSpecies, setAddInitialSpecies] = useState(null)
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [dismissedBanner, setDismissedBanner] = useState(false)
  const { permission, requestPermission } = useNotifications(plants, getStatus)

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
      {/* Screens — all mounted, hidden when inactive to preserve scroll/state */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <div style={{ display: activeTab === 'home' ? 'contents' : 'none' }}>
          <HomeScreen
            plants={plants}
            getStatus={getStatus}
            onWater={waterPlant}
            onAddPlant={() => { setAddInitialSpecies(null); setShowAdd(true) }}
            onOpenPlant={(plant) => setSelectedPlant(plant)}
          />
        </div>
        <div style={{ display: activeTab === 'calendar' ? 'contents' : 'none' }}>
          <CalendarScreen
            plants={plants}
            wateredMap={wateredMap}
            getStatus={getStatus}
            onWater={waterPlant}
          />
        </div>
        <div style={{ display: activeTab === 'discover' ? 'contents' : 'none' }}>
          <DiscoverScreen
            onAddFromDiscover={handleAddFromDiscover}
          />
        </div>
        <div style={{ display: activeTab === 'profile' ? 'contents' : 'none' }}>
          <ProfileScreen plants={plants} onRemovePlant={removePlant} />
        </div>

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
          onAddNote={addNote}
          onRemoveNote={removeNote}
        />
      )}

      {/* Notification permission banner */}
      {permission === 'default' && !dismissedBanner && (
        <div style={{
          position: 'absolute', bottom: 80, left: 16, right: 16, zIndex: 100,
          background: T.green, borderRadius: 18, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: `0 4px 20px ${T.green}55`,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>
              Erinnerungen aktivieren?
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
              Wir erinnern dich, wenn deine Pflanzen Wasser brauchen.
            </div>
          </div>
          <button
            onClick={async () => { await requestPermission(); setDismissedBanner(true) }}
            style={{
              padding: '8px 14px', borderRadius: 10,
              background: '#fff', color: T.green,
              border: 'none', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
            }}>Ja</button>
          <button
            onClick={() => setDismissedBanner(true)}
            style={{
              padding: '8px 10px', borderRadius: 10,
              background: 'rgba(255,255,255,0.2)', color: '#fff',
              border: 'none', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
            }}>Später</button>
        </div>
      )}
    </div>
  )
}

