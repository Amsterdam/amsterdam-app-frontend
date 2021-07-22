import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Text, Title} from '../components/ui'
import {Image} from '../components/ui/Image'
import {image} from '../tokens'

type ProjectNewsScreenRouteProp = RouteProp<RootStackParamList, 'ProjectNews'>

type Props = {
  route: ProjectNewsScreenRouteProp
}

export const ProjectNewsScreen = ({route}: Props) => {
  const {newsArticle} = route.params
  return (
    <ScreenWrapper>
      <ScrollView>
        <Image source={newsArticle.imageSource} style={styles.image} />
        <Box>
          <Title margin text={newsArticle.title} />
          <Text margin>{newsArticle.intro}</Text>
          {newsArticle.paragraphs?.length &&
            newsArticle.paragraphs.map(paragraph => {
              return (
                <View key={paragraph.title}>
                  <Title level={4} margin text={paragraph.title} />
                  <Text margin>{paragraph.text}</Text>
                </View>
              )
            })}
        </Box>
        {newsArticle.contact && (
          <Box background="invalid">
            <Title inverse level={2} margin text="Contact" />
            <Text inverse>{newsArticle.contact.name}</Text>
            <Text inverse>{newsArticle.contact.phone}</Text>
            <Text inverse>{newsArticle.contact.email}</Text>
          </Box>
        )}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
  },
})
