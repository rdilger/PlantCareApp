import { useEffect, useRef, useCallback } from 'react'

function todayKey(plantId) {
  return `${plantId}:${new Date().toISOString().slice(0, 10)}`
}

export function useNotifications(plants, getStatus) {
  const firedRef = useRef(new Set())

  const checkAndNotify = useCallback(() => {
    if (Notification.permission !== 'granted') return
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')
    const currentTime = `${hh}:${mm}`

    plants.forEach(plant => {
      if (plant.reminderTime !== currentTime) return
      const { status } = getStatus(plant)
      if (status !== 'due' && status !== 'overdue') return
      const key = todayKey(plant.id)
      if (firedRef.current.has(key)) return
      firedRef.current.add(key)
      new Notification(`${plant.name} braucht Wasser 💧`, {
        body: `${plant.name} ${status === 'overdue' ? 'ist überfällig' : 'sollte heute gegossen werden'}.`,
        icon: '/favicon.ico',
      })
    })
  }, [plants, getStatus])

  useEffect(() => {
    const id = setInterval(checkAndNotify, 60_000)
    return () => clearInterval(id)
  }, [checkAndNotify])

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return 'unsupported'
    const result = await Notification.requestPermission()
    return result
  }, [])

  const permission = typeof window !== 'undefined' && 'Notification' in window
    ? Notification.permission
    : 'unsupported'

  return { permission, requestPermission }
}
