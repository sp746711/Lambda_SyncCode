import { useEffect } from 'react'

export const useLocalStorage = (key, value, enabled = true) => {
  useEffect(() => {
    if (!enabled) return
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [enabled, key, value])
}

export const readLocalStorage = (key, fallbackValue) => {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallbackValue
  } catch {
    return fallbackValue
  }
}
