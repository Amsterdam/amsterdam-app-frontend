import {useEffect, useState} from 'react'
import RNRestart from 'react-native-restart'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {TextInput} from '@/components/ui/forms/TextInput'
import {Column} from '@/components/ui/layout/Column'
import {Environment, EnvironmentConfig, environments} from '@/environment'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {isDevApp} from '@/processes/development'
import {baseApi} from '@/services/init'
import {
  selectEnvironmentConfig,
  setCustomEnvironment,
  setEnvironment,
} from '@/store/slices/environment'

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

    if (Object.keys(customUrls).length) {
      dispatch(baseApi.util.resetApiState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [custom, custom?.apiUrl, custom?.modulesApiUrl, dispatch])

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
              accessibilityLabel="apiUrl"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              label="apiUrl"
              onChangeText={text => setCustomUrls(v => ({...v, apiUrl: text}))}
              selectTextOnFocus={false}
              value={customUrls?.apiUrl ?? ''}
            />
            <TextInput
              accessibilityLabel="modulesApiUrl"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              label="modulesApiUrl"
              onChangeText={text =>
                setCustomUrls(v => ({...v, modulesApiUrl: text}))
              }
              selectTextOnFocus={false}
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
