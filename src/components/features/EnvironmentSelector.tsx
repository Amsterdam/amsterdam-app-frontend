import React, {useEffect, useState} from 'react'
import BuildConfig from 'react-native-build-config'
import {useDispatch, useSelector} from 'react-redux'
import {Environment, EnvironmentConfig, environments} from '../../environment'
import {baseApi} from '../../services'
import {
  selectEnvironmentConfig,
  setEnvironment,
  setCustomEnvironment,
} from '../../store'
import {Box, Text, Button} from '../ui'
import {TextInput} from '../ui/forms'

export const EnvironmentSelector = () => {
  const dispatch = useDispatch()
  const {environment, custom} = useSelector(selectEnvironmentConfig)
  const [customUrls, setCustomUrls] = useState<Partial<EnvironmentConfig>>({})

  useEffect(() => {
    setCustomUrls({
      apiUrl: custom?.apiUrl ?? environments[Environment.Custom].apiUrl,
      modulesApiUrl:
        custom?.modulesApiUrl ?? environments[Environment.Custom].modulesApiUrl,
    })
    dispatch(baseApi.util.resetApiState())
  }, [custom?.apiUrl, custom?.modulesApiUrl, dispatch])

  if ((BuildConfig?.BUILD_VARIANT ?? '') !== 'dev') {
    return null
  }

  return (
    <Box>
      <Text>Environment: {environments[environment].name}</Text>
      {Object.entries(environments).map(([envKey, envData]) => {
        const env: Environment = Number(envKey)
        return (
          <Button
            text={envData.name}
            key={envKey}
            onPress={() => {
              dispatch(setEnvironment(env))
              dispatch(baseApi.util.resetApiState())
            }}
            variant={environment === env ? 'inverse' : 'primary'}
          />
        )
      })}
      {environment === Environment.Custom && (
        <>
          <TextInput
            label="apiUrl"
            onChangeText={text => setCustomUrls(v => ({...v, apiUrl: text}))}
            value={customUrls?.apiUrl ?? ''}
          />
          <TextInput
            label="modulesApiUrl"
            onChangeText={text =>
              setCustomUrls(v => ({...v, modulesApiUrl: text}))
            }
            value={customUrls?.modulesApiUrl ?? ''}
          />
          <Button
            text="Go!"
            onPress={() => {
              dispatch(setCustomEnvironment(customUrls))
            }}
          />
        </>
      )}
    </Box>
  )
}
