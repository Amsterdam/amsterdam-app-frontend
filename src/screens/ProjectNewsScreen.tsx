import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, useWindowDimensions} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import {RootStackParamList} from '../../App'
import {Box, Image, ScreenWrapper, Title} from '../components/ui'
import {tagsStyles} from '../styles/html'
import {font, image} from '../tokens'

type ProjectNewsScreenRouteProp = RouteProp<RootStackParamList, 'ProjectNews'>

type Props = {
  route: ProjectNewsScreenRouteProp
}

export const ProjectNewsScreen = ({route}: Props) => {
  const {newsArticle} = route.params
  const {content} = newsArticle
  const {width} = useWindowDimensions()

  return (
    <ScreenWrapper>
      <ScrollView>
        <Image source={{uri: newsArticle.image_url}} style={styles.image} />
        <Box>
          <Title margin text={newsArticle.title} />
          <RenderHTML
            contentWidth={width}
            source={{html: content}}
            systemFonts={[font.weight.regular, font.weight.demi]}
            tagsStyles={tagsStyles}
          />
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
  },
})
