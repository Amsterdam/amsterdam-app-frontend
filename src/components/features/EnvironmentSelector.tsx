import React from 'react'
import BuildConfig from 'react-native-build-config'
import {useDispatch, useSelector} from 'react-redux'
import {Environment, environments} from '../../environment'
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

  if ((BuildConfig?.BUILD_VARIANT ?? '') !== 'dev') {
    return null
  }

  return (
    <Box>
      <Text>Environment: {environments[environment].name}</Text>
      {(Object.keys(environments) as unknown as Environment[]).map(env => (
        <Button
          text={environments[env].name}
          key={env}
          onPress={() => {
            console.log('click', environments[env].name, env)
            dispatch(setEnvironment(env))
            dispatch(baseApi.util.resetApiState())
          }}
          variant={environment === env ? 'inverse' : 'primary'}
        />
      ))}
      {environment === Environment.Custom && (
        <>
          <TextInput
            label="apiUrl"
            onChangeText={text =>
              dispatch(setCustomEnvironment({apiUrl: text}))
            }
            value={custom?.apiUrl ?? 'http://localhost:8000/api/v1'}
          />
        </>
      )}
    </Box>
  )
}
