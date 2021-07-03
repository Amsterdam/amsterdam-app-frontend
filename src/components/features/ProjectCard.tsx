import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'
import {RootStackParamList} from '../../../App'
import {Card, CardBody, Title} from '../ui'

type Props = {
  id: string
  imageSource: ImageSourcePropType
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  title: string
  width?: number
}

export const ProjectCard = ({
  id,
  imageSource,
  navigation,
  title,
  width,
}: Props) => (
  <View style={{width}}>
    <TouchableHighlight
      onPress={() => navigation.navigate('ProjectDetail', {id})}>
      <Card>
        <Image source={imageSource} style={styles.image} />
        <CardBody>
          <Title level={4} text={title} />
        </CardBody>
      </Card>
    </TouchableHighlight>
  </View>
)

const styles = StyleSheet.create({
  image: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
