import { useState, useCallback } from 'react'
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
  const seeded = SEED_PLANTS.map((p, i) => ({ ...p }))
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

  const addPlant = useCallback((data) => {
    const hue = PLANT_HUES[plants.length % PLANT_HUES.length]
    const plant = {
      id: crypto.randomUUID(),
      name: data.name,
      species: data.species || '',
      room: data.room || '',
      light: data.light || 'indirect',
      frequency: data.frequency || 7,
      reminderTime: data.reminderTime || '08:00',
      letter: (data.name[0] || '?').toUpperCase(),
      hue,
      createdAt: new Date().toISOString(),
    }
    const next = [...plants, plant]
    setPlants(next)
    savePlants(next)

    // Mark as watered today so it shows 'ok' initially
    const nextMap = { ...wateredMap, [plant.id]: new Date().toISOString() }
    setWateredMap(nextMap)
    saveWateredMap(nextMap)

    return plant
  }, [plants, wateredMap])

  const removePlant = useCallback((id) => {
    const next = plants.filter(p => p.id !== id)
    setPlants(next)
    savePlants(next)
    const nextMap = { ...wateredMap }
    delete nextMap[id]
    setWateredMap(nextMap)
    saveWateredMap(nextMap)
  }, [plants, wateredMap])

  const waterPlant = useCallback((id) => {
    const nextMap = { ...wateredMap, [id]: new Date().toISOString() }
    setWateredMap(nextMap)
    saveWateredMap(nextMap)
  }, [wateredMap])

  return { plants, wateredMap, addPlant, removePlant, waterPlant, getStatus }
}
