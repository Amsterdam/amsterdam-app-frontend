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
import {RootStackParamList, routes} from '../../App'
import {NewsItemsOverview} from '../components/features/NewsItemsOverview'
import {Box, Gutter, IconButton, ScreenWrapper, Title} from '../components/ui'
import {color, image, size} from '../tokens'
import {ProjectDetail, ProjectDetailResponse} from '../types/project'

type ProjectDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectDetailScreenRouteProp
}

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

  const page = data?.item?.page
  const blok = page?.cluster?.find((c: any) => c.Nam === 'Blok')

  const project: ProjectDetail = useMemo(
    () => ({
      body: {},
      boroughId: '',
      id: page?.PagIdt,
      image: {uri: ''},
      title: page?.title,
    }),
    [page?.PagIdt, page?.title],
  )

  blok?.cluster?.forEach((clusterObj: any) => {
    Array.isArray(clusterObj.cluster) &&
      clusterObj.cluster.forEach((nestedClusterObj: any) => {
        const veldCache: any = {}

        Array.isArray(nestedClusterObj.veld) &&
          nestedClusterObj.veld.forEach((veldObj: any) => {
            veldCache[veldObj.Nam] = veldObj.Wrd ?? veldObj.Txt

            if (veldObj.Nam === 'Afbeelding') {
              project.image = {
                uri:
                  'https://www.amsterdam.nl/publish/pages/' +
                  `${project.id}/${veldObj.FilNam}`,
              }
            }

            if (veldObj.Nam === 'App categorie') {
              const selAka = veldObj.SelAka.toString()
              if (selAka === 'contact') {
                project.body.contact = {
                  text: veldCache.Tekst,
                  title: veldCache.Titel,
                }
              }
              if (selAka === 'what') {
                project.body.what = {
                  text: veldCache.Tekst,
                  title: veldCache.Titel,
                }
              }
              if (selAka === 'when') {
                project.body.when = {
                  text: veldCache.Tekst,
                  title: veldCache.Titel,
                }
              }
              if (selAka === 'where') {
                project.body.where = {
                  text: veldCache.Tekst,
                  title: veldCache.Titel,
                }
              }
              if (selAka === 'work') {
                project.body.work = {
                  text: veldCache.Tekst,
                  title: veldCache.Titel,
                }
              }
            }
          })
      })
  })

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
          {project.image && (
            <Image source={project.image} style={styles.image} />
          )}
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
