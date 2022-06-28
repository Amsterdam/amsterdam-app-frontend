import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Environment, EnvironmentConfig, environments} from '../../environment'
import {baseApi, isDevApp} from '../../services'
import {
  selectEnvironmentConfig,
  setCustomEnvironment,
  setEnvironment,
} from '../../store'
import {Box} from '../ui'
import {TextInput} from '../ui/forms'
import {Grid, GridCell} from '../ui/layout'
import {Button} from '@/components/ui/buttons'

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
        <Grid>
          {Object.keys(environments).map(env => {
            return (
              <GridCell key={env}>
                <Button
                  text={env}
                  onPress={() => {
                    dispatch(setEnvironment(env as Environment))
                    dispatch(baseApi.util.resetApiState())
                  }}
                  variant={environment === env ? 'inverse' : 'primary'}
                />
              </GridCell>
            )
          })}
        </Grid>
      </Box>
      {environment === Environment.custom && (
        <Box>
          <Grid>
            <GridCell>
              <TextInput
                label="apiUrl"
                onChangeText={text =>
                  setCustomUrls(v => ({...v, apiUrl: text}))
                }
                value={customUrls?.apiUrl ?? ''}
              />
            </GridCell>
            <GridCell>
              <TextInput
                label="modulesApiUrl"
                onChangeText={text =>
                  setCustomUrls(v => ({...v, modulesApiUrl: text}))
                }
                value={customUrls?.modulesApiUrl ?? ''}
              />
            </GridCell>
            <GridCell>
              <Button
                text="Go!"
                onPress={() => {
                  dispatch(setCustomEnvironment(customUrls))
                }}
              />
            </GridCell>
          </Grid>
        </Box>
      )}
    </>
  ) : null
}
