import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native'
import {RenderHTML} from 'react-native-render-html'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Text, Title} from '../components/ui'
import {tagsStyles} from '../styles/html'
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
  const {width} = useWindowDimensions()

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
              <RenderHTML
                contentWidth={width}
                source={{html: project.body.contact.text}}
                systemFonts={[font.weight.regular, font.weight.demi]}
                tagsStyles={tagsStyles}
              />
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
