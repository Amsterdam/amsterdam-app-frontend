import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Environment, EnvironmentConfig, environments} from '../../environment'
import {baseApi} from '../../services'
import {isDevApp} from '../../services/development'
import {
  selectEnvironmentConfig,
  setCustomEnvironment,
  setEnvironment,
} from '../../store'
import {Attention, Box, Button, Text} from '../ui'
import {TextInput} from '../ui/forms'
import {Column, Grid, GridCell} from '../ui/layout'
import {Title} from '../ui/typography'

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

  if (isDevApp) {
    return (
      <Box>
        <Grid>
          {Object.entries(environments).map(([envKey, {name}]) => {
            const env: Environment = Number(envKey)

            return (
              <GridCell key={envKey}>
                <Button
                  text={name}
                  onPress={() => {
                    dispatch(setEnvironment(env))
                    dispatch(baseApi.util.resetApiState())
                  }}
                  variant={environment === env ? 'inverse' : 'primary'}
                />
              </GridCell>
            )
          })}
        </Grid>

        {environment === Environment.Custom && (
          <Box>
            <Column gutter="md">
              <TextInput
                label="apiUrl"
                onChangeText={text =>
                  setCustomUrls(v => ({...v, apiUrl: text}))
                }
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
            </Column>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box>
      <Attention warning>
        <Title level="h6" text="Fout" />
        <Text>
          De applicatie moet in ‘development’ mode zijn om een omgeving te
          kunnen selecteren.
        </Text>
      </Attention>
    </Box>
  )
}
