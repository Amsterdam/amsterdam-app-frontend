import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import {stripHtml} from 'string-strip-html'
import {RootStackParamList, routes} from '../../App'
import {NewsItemsOverview} from '../components/features/NewsItemsOverview'
import {Box, Gutter, IconButton, ScreenWrapper, Title} from '../components/ui'
import {color, image, size} from '../tokens'
import {
  ProjectDetail,
  ProjectDetailResponse,
  Section as ProjectSection,
} from '../types/project'

type ProjectDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectDetailScreenRouteProp
}

const cleanHtml = (text?: string) => stripHtml(text?.trim() || '').result

export const ProjectDetailScreen = ({navigation, route}: Props) => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<ProjectDetailResponse>({item: {}})

  useEffect(() => {
    fetch(`${route.params.url}?AppIdt=app-pagetype&reload=true`)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [route.params.url])

  console.clear()

  const blok = data?.item?.page?.cluster?.find(
    (cluster: any) => cluster.Nam === 'Blok',
  )

  type ProjectContent = {
    body: {
      contact?: ProjectSection
      what?: ProjectSection
      when?: ProjectSection
      where?: ProjectSection
      work?: ProjectSection
    }
    boroughId: string
    id?: string
    image?: string
    title?: string
  }

  const projectContent: ProjectContent = {
    body: {},
    boroughId:
      data?.item?.page?.cluster[0]?.cluster?.cluster[3]?.veld?.SelItmIdt,
    id: data?.item?.page?.PagIdt,
    title: data?.item?.page?.title,
  }

  blok?.cluster?.forEach((blokCluster: any) => {
    Array.isArray(blokCluster.cluster) &&
      blokCluster.cluster.forEach((clusterCluster: any) => {
        const veldCache: any = {}

        Array.isArray(clusterCluster.veld) &&
          clusterCluster.veld.forEach((veld: any) => {
            veldCache[veld.Nam] = veld.Wrd ?? cleanHtml(veld.Txt) ?? veld.SelAka

            if (veld.Nam === 'Afbeelding') {
              projectContent.image = veld.FilNam
            }

            if (veld.Nam === 'App categorie') {
              const selAka = veld.SelAka.toString()
              if (selAka === 'contact') {
                projectContent.body.contact = {
                  text: veldCache.Tekst,
                  title: veldCache.Titel,
                }
              }
              if (selAka === 'what') {
                projectContent.body.what = {
                  text: veldCache.Tekst,
                  title: veldCache.Titel,
                }
              }
              if (selAka === 'when') {
                projectContent.body.when = {
                  text: veldCache.Tekst,
                  title: veldCache.Titel,
                }
              }
              if (selAka === 'where') {
                projectContent.body.where = {
                  text: veldCache.Tekst,
                  title: veldCache.Titel,
                }
              }
              if (selAka === 'work') {
                projectContent.body.work = {
                  text: veldCache.Tekst,
                  title: veldCache.Titel,
                }
              }
            }
          })
      })
  })

  const project: ProjectDetail = useMemo(
    () =>
      !isLoading &&
      data.item.page && {
        body: projectContent.body,
        boroughId: projectContent.boroughId,
        id: projectContent.id,
        image: {
          uri:
            'https://www.amsterdam.nl/publish/pages/' +
            `${projectContent.id}/${projectContent.image}`,
        },
        title: projectContent.title,
      },
    [
      data.item.page,
      isLoading,
      projectContent.body,
      projectContent.boroughId,
      projectContent.id,
      projectContent.image,
      projectContent.title,
    ],
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project?.title,
    })
  }, [navigation, project])

  return (
    <ScreenWrapper>
      {isLoading ? (
        <Box>
          <ActivityIndicator />
        </Box>
      ) : (
        <ScrollView>
          <Image source={project.image} style={styles.image} />
          <Box background="lighter">
            <Title margin text={project.title} />
            <View style={styles.row}>
              {project.body.what && (
                <IconButton
                  icon={<Info fill={color.font.inverse} />}
                  label="Informatie"
                  onPress={() =>
                    navigation.navigate(routes.projectDetailInformation.name, {
                      project,
                    })
                  }
                />
              )}
              {project.body.work && (
                <IconButton
                  icon={<LocationFields fill={color.font.inverse} />}
                  label="Werkzaam-heden"
                  onPress={() =>
                    navigation.navigate(routes.projectDetailWork.name, {
                      project,
                    })
                  }
                />
              )}
              {project.body.when && (
                <IconButton
                  icon={<Calendar fill={color.font.inverse} />}
                  label="Tijdlijn"
                  onPress={() =>
                    navigation.navigate(routes.projectDetailTimeline.name, {
                      project,
                    })
                  }
                />
              )}
              {project.body.contact && (
                <IconButton
                  icon={<ChatBubble fill={color.font.inverse} />}
                  label="Contact"
                  onPress={() =>
                    navigation.navigate(routes.projectDetailContact.name, {
                      project,
                    })
                  }
                />
              )}
            </View>
          </Box>
          <Box background="light">
            <Title level={2} text="Nieuws" />
            <Gutter height={size.spacing.md} />
            <NewsItemsOverview />
          </Box>
        </ScrollView>
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
})
