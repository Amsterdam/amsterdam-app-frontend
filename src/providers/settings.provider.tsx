import React, {createContext, useCallback, useEffect, useState} from 'react'
import {useAsyncStorage} from '../hooks'
import {Settings} from '../types'

const initialState = {
  changeSettings: () => {},
  settings: undefined,
}

type Context = {
  changeSettings: (key: keyof Settings, value: Record<string, any>) => void
  settings: Settings | undefined
}

export const SettingsContext = createContext<Context>(initialState)

export const SettingsProvider = ({children}: {children: React.ReactNode}) => {
  const asyncStorage = useAsyncStorage()
  const [settings, setSettings] = useState<Settings | undefined>()

  const retrieveSettings = useCallback(async () => {
    const data = await asyncStorage.getAll()
    const settingsFromStore = Object.fromEntries(data ?? [])

    let parsedSettings = {} as Record<string, string>
    for (var x in settingsFromStore) {
      parsedSettings[x] = JSON.parse(settingsFromStore[x]!)
    }

    setSettings(parsedSettings)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const changeSettings = async (
    key: keyof Settings,
    value: Record<string, any>,
  ) => {
    await asyncStorage.storeData(key, value)
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  useEffect(() => {
    retrieveSettings()
  }, [retrieveSettings])

  return (
    <SettingsContext.Provider
      value={{
        changeSettings,
        settings,
      }}>
      {children}
    </SettingsContext.Provider>
  )
}
