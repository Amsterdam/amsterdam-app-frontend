import {useEffect, useState} from 'react'
import RNRestart from 'react-native-restart'
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
      releaseApiUrl:
        custom?.releaseApiUrl ?? environments[Environment.custom].releaseApiUrl,
    })
    if (Object.keys(customUrls).length) {
      dispatch(baseApi.util.resetApiState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [custom, custom?.apiUrl, custom?.releaseApiUrl, dispatch])

  useEffect(() => () => RNRestart.Restart(), [])

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
              label="releaseApiUrl"
              onChangeText={text =>
                setCustomUrls(v => ({...v, releaseApiUrl: text}))
              }
              value={customUrls?.releaseApiUrl ?? ''}
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
