import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Text, Title} from '../components/ui'
import {color, font, size} from '../tokens'

type ProjectDetailContactScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetailContact'
>

type Props = {
  route: ProjectDetailContactScreenRouteProp
}

export const ProjectDetailContactScreen = ({route}: Props) => {
  const {project} = route.params
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project.title,
    })
  })

  return (
    <ScreenWrapper>
      <ScrollView>
        <Box background="lighter">
          <View style={styles.row}>
            <ChatBubble fill={color.font.primary} style={styles.icon} />
            <Title primary text="Contact" />
          </View>
        </Box>
        <Box>
          {project.body.contact ? (
            <Box background="lighter">
              <Text margin>{project.body.contact.text}</Text>
            </Box>
          ) : (
            <Text>Geen informatie gevonden.</Text>
          )}
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: font.height.h1,
    marginRight: size.spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
})
