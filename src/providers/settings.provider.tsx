import React, {createContext, useCallback, useEffect, useState} from 'react'
import {useAsyncStorage, useDeviceRegistration} from '../hooks'
import {Settings} from '../types'

const initialState = {
  changeSettings: () => {},
  removeSetting: () => {},
  settings: undefined,
}

type Context = {
  changeSettings: (key: keyof Settings, value: Record<string, any>) => void
  removeSetting: (key: keyof Settings) => void
  settings: Settings | undefined
}

export const SettingsContext = createContext<Context>(initialState)

export const SettingsProvider = ({children}: {children: React.ReactNode}) => {
  const [settings, setSettings] = useState<Settings | undefined>()
  const asyncStorage = useAsyncStorage()
  const deviceRegistration = useDeviceRegistration(settings)

  const retrieveSettings = useCallback(async () => {
    if (!settings || asyncStorage.isStoreUpdated) {
      const data = await asyncStorage.getAllValues()
      const settingsFromStore = Object.fromEntries(data ?? [])

      let parsedSettings = {} as Record<string, string>
      for (let x in settingsFromStore) {
        parsedSettings[x] = JSON.parse(settingsFromStore[x]!)
      }

      setSettings(parsedSettings)
    }
  }, [asyncStorage.isStoreUpdated]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const removeSetting = async (key: keyof Settings) => {
    await asyncStorage.removeValue(key)

    let copyOfSettings = {...settings}
    delete copyOfSettings[key]

    setSettings(copyOfSettings)
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
        removeSetting,
        settings,
      }}>
      {children}
    </SettingsContext.Provider>
  )
}
