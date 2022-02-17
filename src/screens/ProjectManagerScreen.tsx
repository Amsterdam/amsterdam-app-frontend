import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {StackParams, TabParams} from '../app/navigation'
import {routes, tabs} from '../app/navigation/routes'
import {ProjectTitle} from '../components/features/project'
import {Box, Button, Divider, PleaseWait, Text, Title} from '../components/ui'
import {Column, Gutter, Row, ScrollView} from '../components/ui/layout'
import {SettingsContext} from '../providers/settings.provider'
import {useGetProjectManagerQuery, useGetProjectsQuery} from '../services'
import {setCredentials} from '../store'
import {color, size} from '../tokens'
import {Projects} from '../types'
import {encryptWithAES} from '../utils'

type ProjectManagerScreenRouteProp = RouteProp<StackParams, 'ProjectManager'>

type Props = {
  navigation: StackNavigationProp<StackParams & TabParams, 'ProjectManager'>
  route: ProjectManagerScreenRouteProp
}

export const ProjectManagerScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch()
  const {changeSettings, settings} = useContext(SettingsContext)
  const projectManagerSettings = settings && settings['project-manager']
  const [authorizedProjects, setAuthorizedProjects] = useState<Projects>()
  const projectManagerId = route.params?.id

  useEffect(() => {
    projectManagerId &&
      dispatch(
        setCredentials({
          managerToken: encryptWithAES({
            password: '6886b31dfe27e9306c3d2b553345d9e5',
            salt: projectManagerId,
          }),
        }),
      )
  }, [dispatch, projectManagerId])

  const {data: projectManager, isLoading: projectManagerIsLoading} =
    useGetProjectManagerQuery({id: projectManagerId}, {skip: !projectManagerId})

  const {data: projects} = useGetProjectsQuery({
    fields: ['identifier', 'subtitle', 'title'],
  })

  const storeProjectManagerSettings = useCallback(async () => {
    if (!projectManagerIsLoading && projectManager) {
      const newProjectManagerSettings = {
        id: projectManagerId,
        projects: projectManager.projects,
      }
      changeSettings('project-manager', newProjectManagerSettings)
    }
  }, [projectManagerIsLoading]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    storeProjectManagerSettings()
  }, [storeProjectManagerSettings])

  useEffect(() => {
    if (projects && projectManager) {
      setAuthorizedProjects(
        projects.filter(project =>
          projectManager.projects.includes(project.identifier),
        ),
      )
    }
  }, [projects, projectManager])

  return authorizedProjects === undefined &&
    projectManagerSettings?.projects ? (
    <PleaseWait />
  ) : (
    <View style={styles.screenHeight}>
      {authorizedProjects?.length ? (
        <ScrollView>
          <Box insetVertical="lg" insetHorizontal="md">
            <Column gutter="md">
              <Row gutter="sm">
                <Checkmark fill={color.status.success} height={28} width={28} />
                <Title text="Gelukt!" />
              </Row>
              <Text intro>
                Je kunt voor de volgende projecten een pushbericht versturen
                vanaf de projectpagina:
              </Text>
            </Column>
            <Gutter height="lg" />
            <Divider />
            {authorizedProjects.map(
              (authProject, index) =>
                authProject && (
                  <Fragment key={authProject.identifier}>
                    <TouchableOpacity
                      style={styles.button}
                      accessibilityRole="button"
                      key={authProject.identifier}
                      onPress={() => {
                        authProject.identifier &&
                          navigation.navigate(routes.projectDetail.name, {
                            id: authProject.identifier,
                          })
                      }}>
                      <ProjectTitle
                        title={authProject.title}
                        subtitle={authProject.subtitle ?? undefined}
                      />
                    </TouchableOpacity>
                    {index < authorizedProjects.length && <Divider />}
                  </Fragment>
                ),
            )}
          </Box>
        </ScrollView>
      ) : (
        <Box insetVertical="lg" insetHorizontal="md">
          <Column gutter="md">
            <Row gutter="sm">
              <Close fill={color.status.error} height={28} width={28} />
              <Title text="Er gaat iets mis…" />
            </Row>
            <Text intro>
              Helaas lukt het niet om de projecten te laden waarvoor je
              pushberichten mag versturen. Probeer de app nogmaals te openen met
              de toegestuurde link.
            </Text>
            <Text>Lukt dit niet? Neem dan contact op met de redactie.</Text>
          </Column>
        </Box>
      )}
      <Box>
        <Button
          text="Sluit venster"
          onPress={() =>
            navigation.navigate(tabs.home.name, {
              screen: routes.home.name,
            })
          }
        />
      </Box>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: size.spacing.sm,
  },
  screenHeight: {
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: size.spacing.md,
  },
})
