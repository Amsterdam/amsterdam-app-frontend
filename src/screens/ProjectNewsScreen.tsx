import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {RootStackParamList} from '../../App'
import {Inset, ScreenWrapper, Text, Title} from '../components/ui'
import {Image} from '../components/ui/Image'
import {color} from '../tokens'

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
        <Inset>
          <Title prose text={newsArticle.title} />
          <Text>{newsArticle.intro}</Text>
          {newsArticle.paragraphs?.length &&
            newsArticle.paragraphs.map(paragraph => {
              return (
                <View key={paragraph.title}>
                  <Title level={2} prose text={paragraph.title} />
                  <Text>{paragraph.text}</Text>
                </View>
              )
            })}
        </Inset>
        {newsArticle.contact && (
          <View style={styles.contact}>
            <Title inverse level={2} prose text="Contact" />
            <Text inverse>{newsArticle.contact.name}</Text>
            <Text inverse>{newsArticle.contact.phone}</Text>
            <Text inverse>{newsArticle.contact.email}</Text>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  contact: {
    backgroundColor: color.secondary.main,
    color: color.bright.main,
    padding: 15,
  },
  image: {
    height: 150,
  },
})
