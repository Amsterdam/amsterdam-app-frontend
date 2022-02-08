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
  isLoading: true,
  removeSetting: () => {},
  settings: undefined,
}

type Context = {
  changeSettings: (key: keyof Settings, value: Record<string, any>) => void
  isLoading: boolean
  removeSetting: (key: keyof Settings) => void
  settings: Settings | undefined
}

export const SettingsContext = createContext<Context>(initialState)

type Props = {
  children: ReactNode
}

export const SettingsProvider = ({children}: Props) => {
  const [settings, setSettings] = useState<Settings | undefined>()
  const [isLoading, setLoading] = useState(true)
  const asyncStorage = useAsyncStorage()
  const deviceRegistration = useDeviceRegistration(settings)

  const retrieveSettings = useCallback(async () => {
    if (!settings) {
      setLoading(true)
      const data = await asyncStorage.getAllValues()
      const settingsFromStore = Object.fromEntries(data ?? [])

      let parsedSettings = {} as Record<string, string>
      for (let x in settingsFromStore) {
        parsedSettings[x] = JSON.parse(settingsFromStore[x]!)
      }

      setSettings(parsedSettings)
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const changeSettings = async (
    key: keyof Settings,
    value: Record<string, any>,
  ) => {
    setLoading(true)
    await asyncStorage.storeData(key, value)
    setSettings({
      ...settings,
      [key]: value,
    })
    setLoading(false)
  }

  const removeSetting = async (key: keyof Settings) => {
    setLoading(true)
    await asyncStorage.removeValue(key)

    let copyOfSettings = {...settings}
    delete copyOfSettings[key]

    setSettings(copyOfSettings)
    setLoading(false)
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
        isLoading,
        removeSetting,
        settings,
      }}>
      {children}
    </SettingsContext.Provider>
  )
}
