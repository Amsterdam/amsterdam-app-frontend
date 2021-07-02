import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../App'
import {Button, Card, CardBody, Title} from '../ui'

type ProjectCardProps = {
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
}: ProjectCardProps) => (
  <View style={{width}}>
    <Card>
      <Image source={imageSource} style={styles.image} />
      <CardBody>
        <Title level={4} text={title} />
        <Button
          onPress={() => navigation.navigate('ProjectDetail', {id})}
          text="Ga naar project"
        />
      </CardBody>
    </Card>
  </View>
)

const styles = StyleSheet.create({
  image: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
