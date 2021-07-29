import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, useWindowDimensions} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Title} from '../components/ui'
import {Image} from '../components/ui'
import {color, font, image} from '../tokens'

type ProjectNewsScreenRouteProp = RouteProp<RootStackParamList, 'ProjectNews'>

type Props = {
  route: ProjectNewsScreenRouteProp
}

const renderHtmlStyles = {
  text: {
    fontFamily: font.weight.regular,
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
    color: color.font.regular,
  },
  h3: {
    color: color.font.regular,
    fontFamily: font.weight.demi,
    fontSize: font.size.h3,
    lineHeight: font.height.h3,
  },
}

export const ProjectNewsScreen = ({route}: Props) => {
  const {newsArticle} = route.params
  const {content} = newsArticle
  const {width} = useWindowDimensions()

  const tagsStyles = {
    p: renderHtmlStyles.text,
    li: renderHtmlStyles.text,
    h3: renderHtmlStyles.h3,
  }
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
