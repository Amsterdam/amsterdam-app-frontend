import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {TextInput} from '@/components/ui/forms'
import {Column} from '@/components/ui/layout'
import {Environment, EnvironmentConfig, environments} from '@/environment'
import {isDevApp} from '@/processes'
import {baseApi} from '@/services'
import {
  selectEnvironmentConfig,
  setCustomEnvironment,
  setEnvironment,
} from '@/store'

export const EnvironmentSelector = () => {
  const dispatch = useDispatch()
  const {environment, custom} = useSelector(selectEnvironmentConfig)
  const [customUrls, setCustomUrls] = useState<Partial<EnvironmentConfig>>({})

  useEffect(() => {
    setCustomUrls({
      apiUrl: custom?.apiUrl ?? environments[Environment.custom].apiUrl,
      modulesApiUrl:
        custom?.modulesApiUrl ?? environments[Environment.custom].modulesApiUrl,
    })
    dispatch(baseApi.util.resetApiState())
  }, [custom?.apiUrl, custom?.modulesApiUrl, dispatch])

  return isDevApp ? (
    <>
      <Box>
        <Column gutter="md">
          {Object.keys(environments).map(env => (
            <Button
              key={env}
              label={env}
              onPress={() => {
                dispatch(setEnvironment(env as Environment))
                dispatch(baseApi.util.resetApiState())
              }}
              variant={environment === env ? 'secondary' : 'primary'}
            />
          ))}
        </Column>
      </Box>
      {environment === Environment.custom && (
        <Box>
          <Column gutter="md">
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
              label="Go!"
              onPress={() => {
                dispatch(setCustomEnvironment(customUrls))
              }}
            />
          </Column>
        </Box>
      )}
    </>
  ) : null
}
