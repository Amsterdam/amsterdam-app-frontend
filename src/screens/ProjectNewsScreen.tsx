import {RouteProp} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {StyleSheet, useWindowDimensions} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import {RootStackParamList} from '../../App'
import {Box, Image, PleaseWait, Text, Title} from '../components/ui'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {tagsStyles} from '../styles/html'
import {font, image} from '../tokens'
import {NewsArticle} from '../types'
import {formatDate} from '../utils'

type ProjectNewsScreenRouteProp = RouteProp<RootStackParamList, 'ProjectNews'>

type Props = {
  route: ProjectNewsScreenRouteProp
}

export const ProjectNewsScreen = ({route}: Props) => {
  const [article, setArticle] = useState<NewsArticle | undefined>()
  const {width} = useWindowDimensions()

  const api = useFetch<NewsArticle>({
    url: getEnvironment().apiUrl + '/project/news',
    options: {
      params: {
        id: route.params.id,
      },
    },
  })

  const firstImage = article?.images?.find(i => i.sources['700px'].url)

  useEffect(() => {
    if (api.data) {
      setArticle(api.data)
    }
  }, [api.data])

  return (
    <ScrollView>
      {api.isLoading && <PleaseWait />}
      {firstImage && (
        <Image
          source={{uri: firstImage.sources['700px'].url}}
          style={styles.image}
        />
      )}
      {article && (
        <Box>
          <Title margin text={article.title} />
          <Text margin secondary>
            {formatDate(article.publication_date)}
          </Text>
          {article.body?.preface.html && (
            <RenderHTML
              contentWidth={width}
              source={{html: article.body?.preface.html}}
              systemFonts={[font.weight.regular, font.weight.demi]}
              tagsStyles={tagsStyles}
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
