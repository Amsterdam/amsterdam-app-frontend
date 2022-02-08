import {useNavigation} from '@react-navigation/native'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {StyleSheet, useWindowDimensions} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {tagsStyles, tagsStylesIntro} from '../../../styles/html'
import {font, image} from '../../../tokens'
import {NewsArticle, ProjectDetail} from '../../../types'
import {formatDate, mapImageSources} from '../../../utils'
import {
  Box,
  Image,
  NonScalingHeaderTitle,
  PleaseWait,
  Text,
  Title,
} from '../../ui'
import {useNotificationState} from '../notifications'

type Props = {
  id: string
}

export const ProjectNews = ({id}: Props) => {
  const [article, setArticle] = useState<NewsArticle | undefined>()
  const navigation = useNavigation()
  const notificationState = useNotificationState()
  const {width} = useWindowDimensions()

  const newsApi = useFetch<NewsArticle>({
    url: getEnvironment().apiUrl + '/project/news',
    options: {params: {id}},
  })

  useEffect(() => {
    if (newsApi.data) {
      setArticle(newsApi.data)
    }
  }, [newsApi.data])

  const projectApi = useFetch<ProjectDetail>({
    url: getEnvironment().apiUrl + '/project/details',
    options: {
      params: {
        id: article?.project_identifier ?? '',
      },
    },
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <NonScalingHeaderTitle text={projectApi.data?.title ?? ''} />
      ),
    })
  })

  if (newsApi.isLoading || projectApi.isLoading || !article) {
    return <PleaseWait />
  }

  notificationState.markAsRead(article.identifier)

  return (
    <ScrollView>
      {article?.images?.length && (
        <Image
          source={mapImageSources(article.images[0].sources)}
          style={styles.image}
        />
      )}
      {article && (
        <Box>
          <Text margin secondary>
            {formatDate(article.publication_date)}
          </Text>
          <Title margin text={article.title} />
          {article.body?.preface.html && (
            <RenderHTML
              contentWidth={width}
              source={{html: article.body?.preface.html}}
              systemFonts={[font.weight.regular, font.weight.demi]}
              tagsStyles={tagsStylesIntro}
            />
          )}
          {article.body?.content.html && (
            <RenderHTML
              contentWidth={width}
              source={{html: article.body?.content.html}}
              systemFonts={[font.weight.regular, font.weight.demi]}
              tagsStyles={tagsStyles}
            />
          )}
        </Box>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
  },
})