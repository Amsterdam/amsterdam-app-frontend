import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {useAsyncStorage, useDeviceRegistration} from '../hooks'
import {Settings} from '../types'

const initialState = {
  changeSettings: () => {},
  removeSetting: () => {},
  settings: undefined,
}

type Context = {
  changeSettings: (key: keyof Settings, value: Record<string, any>) => void
  removeSetting: (key: keyof Settings) => string | unknown
  settings: Settings | undefined
}

export const SettingsContext = createContext<Context>(initialState)

type Props = {
  children: ReactNode
}

export const SettingsProvider = ({children}: Props) => {
  const [settings, setSettings] = useState<Settings | undefined>()
  const asyncStorage = useAsyncStorage()
  const deviceRegistration = useDeviceRegistration(settings)

  const retrieveSettings = useCallback(async () => {
    if (!settings) {
      const data = await asyncStorage.getAllValues()
      const settingsFromStore = Object.fromEntries(data ?? [])

      let parsedSettings = {} as Record<string, string>
      for (let x in settingsFromStore) {
        parsedSettings[x] = JSON.parse(settingsFromStore[x]!)
      }

      setSettings(parsedSettings)
    }
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

  const removeSetting = async (key: keyof Settings) => {
    try {
      await asyncStorage.removeValue(key)

      let copyOfSettings = {...settings}
      delete copyOfSettings[key]

      await setSettings(copyOfSettings)
      return 'success'
    } catch (e) {
      return e
    }
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
