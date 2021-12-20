import React, {createContext, useCallback, useEffect, useState} from 'react'
import {useAsyncStorage, useDeviceRegistration} from '../hooks'
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
  const [settings, setSettings] = useState<Settings | undefined>()
  const asyncStorage = useAsyncStorage()
  const deviceRegistration = useDeviceRegistration(settings)

  const retrieveSettings = useCallback(async () => {
    const data = await asyncStorage.getAllValues()
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

  useEffect(() => {
    if (settings) {
      deviceRegistration.store()
    }
  }, [settings]) // eslint-disable-line react-hooks/exhaustive-deps

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
