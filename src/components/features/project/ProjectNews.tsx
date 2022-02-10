import {useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {StyleSheet, useWindowDimensions} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import {useGetProjectNewsQuery, useGetProjectQuery} from '../../../services'
import {tagsStyles, tagsStylesIntro} from '../../../styles/html'
import {font, image} from '../../../tokens'
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
  const navigation = useNavigation()
  const notificationState = useNotificationState()
  const {width} = useWindowDimensions()

  const {data: newsArticle, isLoading: newsArticleIsLoading} =
    useGetProjectNewsQuery({
      id,
    })

  const {data: projectData, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: newsArticle?.project_identifier!,
    },
    {skip: !newsArticle},
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <NonScalingHeaderTitle text={projectData?.title ?? ''} />
      ),
    })
  })

  if (newsArticleIsLoading || projectIsLoading || !newsArticle) {
    return <PleaseWait />
  }

  notificationState.markAsRead(newsArticle.identifier)

  return (
    <ScrollView>
      {newsArticle?.images?.length && (
        <Image
          source={mapImageSources(newsArticle.images[0].sources)}
          style={styles.image}
        />
      )}
      {newsArticle && (
        <Box>
          <Text margin secondary>
            {formatDate(newsArticle.publication_date)}
          </Text>
          <Title margin text={newsArticle.title} />
          {newsArticle.body?.preface.html && (
            <RenderHTML
              contentWidth={width}
              source={{html: newsArticle.body?.preface.html}}
              systemFonts={[font.weight.regular, font.weight.demi]}
              tagsStyles={tagsStylesIntro}
            />
          )}
          {newsArticle.body?.content.html && (
            <RenderHTML
              contentWidth={width}
              source={{html: newsArticle.body?.content.html}}
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
