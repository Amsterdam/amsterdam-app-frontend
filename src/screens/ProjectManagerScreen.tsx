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
import {MenuStackParams, TabParams} from '../app/navigation'
import {homeRoutes, menuRoutes, tabRoutes} from '../app/navigation/routes'
import {ProjectTitle} from '../components/features/project'
import {Box, Button, Divider, PleaseWait, Text, Title} from '../components/ui'
import {Column, Gutter, Row, ScrollView} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {SettingsContext} from '../providers/settings.provider'
import {color, size} from '../tokens'
import {ProjectOverviewItem} from '../types'
import {encryptWithAES} from '../utils'

type ProjectManagerScreenRouteProp = RouteProp<
  MenuStackParams,
  'ProjectManager'
>

type Props = {
  navigation: StackNavigationProp<MenuStackParams & TabParams, 'ProjectManager'>
  route: ProjectManagerScreenRouteProp
}

export const ProjectManagerScreen = ({navigation, route}: Props) => {
  const {changeSettings, settings} = useContext(SettingsContext)
  const projectManagerSettings = settings && settings['project-manager']
  const [allProjects, setAllProjects] = useState<
    ProjectOverviewItem[] | undefined
  >()
  const [authorizedProjects, setAuthorizedProjects] =
    useState<ProjectOverviewItem[]>()
  const idFromParams = route.params?.id

  const authToken = encryptWithAES({
    password: '6886b31dfe27e9306c3d2b553345d9e5',
    plaintext: idFromParams,
  })

  const apiProjectManager = useFetch<any>({
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
    idFromParams && apiProjectManager.fetchData()
  }, [idFromParams]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    apiProjects.fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const storeProjectManagerSettings = useCallback(async () => {
    if (apiProjectManager.data) {
      const newProjectManagerSettings = {
        id: idFromParams,
        projects: apiProjectManager.data[0].projects,
      }
      changeSettings('project-manager', newProjectManagerSettings)
    }
  }, [apiProjectManager.data]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    storeProjectManagerSettings()
  }, [storeProjectManagerSettings])

  useEffect(() => {
    apiProjects.data && setAllProjects(apiProjects.data)
  }, [apiProjects.data])

  useEffect(() => {
    if (allProjects && projectManagerSettings?.projects) {
      setAuthorizedProjects(
        allProjects.filter(project =>
          projectManagerSettings?.projects.includes(project.identifier),
        ),
      )
    }
  }, [allProjects, projectManagerSettings?.projects])

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
                          navigation.navigate(menuRoutes.projectDetail.name, {
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
            navigation.navigate(tabRoutes.home.name, {
              screen: homeRoutes.home.name,
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
