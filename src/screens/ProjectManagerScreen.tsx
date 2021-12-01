import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {Box, Button, Divider, Text, Title} from '../components/ui'
import {Column, Row, ScrollView} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useAsyncStorage, useFetch} from '../hooks'
import {color, size} from '../tokens'
import {Manager, ProjectOverviewItem} from '../types'
import {encryptWithAES} from '../utils'

type ProjectManagerScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectManager'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectManager'>
  route: ProjectManagerScreenRouteProp
}

export const ProjectManagerScreen = ({navigation, route}: Props) => {
  const [projectManager, setProjectManager] = useState<Manager | undefined>()
  const [allProjects, setAllProjects] = useState<
    ProjectOverviewItem[] | undefined
  >()
  const [authorizedProjects, setAuthorizedProjects] =
    useState<(ProjectOverviewItem | undefined)[]>()
  const asyncStorage = useAsyncStorage()
  const idFromParams = route.params?.id

  const authToken = encryptWithAES({
    password: '6886b31dfe27e9306c3d2b553345d9e5',
    plaintext: idFromParams,
  })

  const apiManager = useFetch<any>({
    url: getEnvironment().apiUrl + '/project/manager',
    onLoad: false,
    options: {
      headers: new Headers({
        'Content-Type': 'application/json',
        UserAuthorization: authToken,
      }),
      params: {id: idFromParams},
    },
  })

  const apiProjects = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
    onLoad: false,
  })

  useEffect(() => {
    idFromParams && apiManager.fetchData()
  }, [idFromParams]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    apiProjects.fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const storeProjectManager = useCallback(async () => {
    if (apiManager.data) {
      const manager = {
        id: idFromParams,
        projects: apiManager.data[0].projects,
      }
      await asyncStorage.storeData('project-manager', projectManager)
      setProjectManager(manager)
    }
  }, [apiManager.data]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    storeProjectManager()
  }, [storeProjectManager])

  useEffect(() => {
    apiProjects.data && setAllProjects(apiProjects.data)
  }, [apiProjects.data])

  useEffect(() => {
    if (allProjects && projectManager?.projects) {
      const authProjects = projectManager?.projects.map(projectId => {
        return allProjects.find(project => project.identifier === projectId)
      })
      setAuthorizedProjects(authProjects)
    }
  }, [allProjects, projectManager?.projects])

  return (
    <Column align="between">
      <Box background="white" inset="md">
        {authorizedProjects ? (
          <ScrollView>
            <Column gutter="md">
              <Row valign="center" gutter="sm">
                <Checkmark fill={color.status.success} height={32} width={32} />
                <Title text="Gelukt!" />
              </Row>
              <Text intro>
                U kunt voor de volgende projecten een pushnotificatie versturen
                vanaf de projectpagina:
              </Text>
              <View>
                <Divider />
                {authorizedProjects.map((authProject, index) => (
                  <Fragment key={authProject?.identifier}>
                    <TouchableOpacity
                      style={styles.button}
                      accessibilityRole="button"
                      key={authProject?.identifier}
                      onPress={() => {
                        authProject?.identifier &&
                          navigation.navigate(routes.projectDetail.name, {
                            id: authProject.identifier,
                          })
                      }}>
                      <Text>{authProject?.title}</Text>
                      {authProject?.subtitle && (
                        <Text secondary small>
                          {authProject?.subtitle}
                        </Text>
                      )}
                    </TouchableOpacity>
                    {index < authorizedProjects.length && <Divider />}
                  </Fragment>
                ))}
              </View>
            </Column>
          </ScrollView>
        ) : (
          <>
            <Column gutter="md">
              <Row valign="center" gutter="sm">
                <Close fill={color.status.error} height={32} width={32} />
                <Title text="Er gaat iets mis…" />
              </Row>
              <Text intro>
                Helaas lukt het niet om de projecten te laden waarvoor u
                notificaties mag versturen. Probeer de app nogmaals te openen
                met de toegestuurde link.
              </Text>
              <Text intro>
                Lukt dit niet? Neem dan contact op met de redactie.
              </Text>
            </Column>
          </>
        )}
      </Box>
      <Box>
        <Button
          text={authorizedProjects ? 'Aan de slag!' : 'Sluit venster'}
          onPress={() => navigation.navigate(routes.home.name)}
        />
      </Box>
    </Column>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: size.spacing.sm,
  },
})
