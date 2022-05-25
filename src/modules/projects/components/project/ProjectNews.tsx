import {useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {StyleSheet, useWindowDimensions} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import {useMarkArticleIdAsRead} from '../../../../components/features/notifications'
import {
  Box,
  Image,
  NonScalingHeaderTitle,
  PleaseWait,
  Text,
  Title,
} from '../../../../components/ui'
import {useEnvironment} from '../../../../store'
import {tagsStyles, tagsStylesIntro} from '../../../../styles/html'
import {font, image} from '../../../../tokens'
import {formatDate, mapImageSources} from '../../../../utils'
import {
  useGetProjectNewsQuery,
  useGetProjectQuery,
} from '../../projects.service'

type Props = {
  id: string
}

export const ProjectNews = ({id}: Props) => {
  const navigation = useNavigation()
  const {width} = useWindowDimensions()

  const {data: news, isLoading: newsIsLoading} = useGetProjectNewsQuery({
    id,
  })

  useMarkArticleIdAsRead(news?.identifier)

  const {data: project, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: news?.project_identifier!,
    },
    {skip: !news},
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={project?.title ?? ''} />,
    })
  })

  const environment = useEnvironment()

  if (newsIsLoading || projectIsLoading || !news) {
    return <PleaseWait />
  }

  return (
    <ScrollView>
      {news?.images?.length && (
        <Image
          source={mapImageSources(news.images[0].sources, environment)}
          style={styles.image}
        />
      )}
      {news && (
        <Box>
          <Text margin secondary>
            {formatDate(news.publication_date)}
          </Text>
          <Title margin text={news.title} />
          {news.body?.preface.html && (
            <RenderHTML
              contentWidth={width}
              source={{html: news.body?.preface.html}}
              systemFonts={[font.weight.regular, font.weight.demi]}
              tagsStyles={tagsStylesIntro}
            />
          )}
          {news.body?.content.html && (
            <RenderHTML
              contentWidth={width}
              source={{html: news.body?.content.html}}
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
