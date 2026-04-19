import { useState, useCallback, useEffect } from 'react'
import { SEED_PLANTS, PLANT_HUES } from '../data.js'

const PLANTS_KEY = 'plantcare_plants'
const WATERED_KEY = 'plantcare_watered'

function loadPlants() {
  try {
    const raw = localStorage.getItem(PLANTS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  // Seed with demo data and set watered dates to create realistic statuses
  const now = new Date()
  const seeded = SEED_PLANTS.map((p) => ({ ...p }))
  localStorage.setItem(PLANTS_KEY, JSON.stringify(seeded))

  // Seed watered map: give each plant a last-watered date to create varied statuses
  const offsets = [0, 6, 10, 4, 3, 4] // days ago
  const wateredMap = {}
  seeded.forEach((p, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - (offsets[i] ?? 0))
    wateredMap[p.id] = d.toISOString()
  })
  localStorage.setItem(WATERED_KEY, JSON.stringify(wateredMap))
  return seeded
}

function loadWateredMap() {
  try {
    const raw = localStorage.getItem(WATERED_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {}
}

function savePlants(plants) {
  localStorage.setItem(PLANTS_KEY, JSON.stringify(plants))
}

function saveWateredMap(map) {
  localStorage.setItem(WATERED_KEY, JSON.stringify(map))
}

function daysSince(isoDate) {
  if (!isoDate) return Infinity
  const ms = Date.now() - new Date(isoDate).getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

export function usePlants() {
  const [plants, setPlants] = useState(() => loadPlants())
  const [wateredMap, setWateredMap] = useState(() => loadWateredMap())

  // Persist whenever state changes (replaces inline save calls in each callback)
  useEffect(() => { savePlants(plants) }, [plants])
  useEffect(() => { saveWateredMap(wateredMap) }, [wateredMap])

  const getStatus = useCallback((plant) => {
    const last = wateredMap[plant.id]
    const ds = daysSince(last)
    const waterIn = plant.frequency - ds
    let status
    if (waterIn < 0) status = 'overdue'
    else if (waterIn === 0) status = 'due'
    else if (waterIn <= 2) status = 'soon'
    else status = 'ok'
    return { daysSince: ds, waterIn, status, lastWatered: last }
  }, [wateredMap])

  // Functional updaters — no stale closures over plants/wateredMap
  const addPlant = useCallback((data) => {
    const plant = {
      id: crypto.randomUUID(),
      name: data.name,
      species: data.species || '',
      room: data.room || '',
      light: data.light || 'indirect',
      frequency: data.frequency || 7,
      reminderTime: data.reminderTime || '08:00',
      letter: (data.name[0] || '?').toUpperCase(),
      hue: 0, // computed below via functional updater
      createdAt: new Date().toISOString(),
    }
    setPlants(prev => {
      const hue = PLANT_HUES[prev.length % PLANT_HUES.length]
      return [...prev, { ...plant, hue }]
    })
    setWateredMap(prev => ({ ...prev, [plant.id]: new Date().toISOString() }))
    return plant
  }, [])

  const removePlant = useCallback((id) => {
    setPlants(prev => prev.filter(p => p.id !== id))
    setWateredMap(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const waterPlant = useCallback((id) => {
    setWateredMap(prev => ({ ...prev, [id]: new Date().toISOString() }))
  }, [])

  const updatePlant = useCallback((id, changes) => {
    setPlants(prev => prev.map(p => p.id === id
      ? { ...p, ...changes, letter: ((changes.name ?? p.name)[0] || '?').toUpperCase() }
      : p
    ))
  }, [])

  return { plants, wateredMap, addPlant, removePlant, waterPlant, updatePlant, getStatus }
}
