import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {ReactNode, useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native'
import {RenderHTML} from 'react-native-render-html'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Title} from '../components/ui'
import {tagsStyles} from '../styles/html'
import {color, font, size} from '../tokens'

type ProjectDetailBodyScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetailBody'
>

type Props = {
  route: ProjectDetailBodyScreenRouteProp
}

export const ProjectDetailBodyScreen = ({route}: Props) => {
  const {body} = route.params
  const navigation = useNavigation()
  const {width} = useWindowDimensions()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: body.headerTitle,
    })
  })

  const icon: Record<string, ReactNode> = {
    Contact: <ChatBubble fill={color.font.primary} style={styles.icon} />,
    Informatie: <Info fill={color.font.primary} style={styles.icon} />,
    Tijdlijn: <Calendar fill={color.font.primary} style={styles.icon} />,
    Werkzaamheden: (
      <LocationFields fill={color.font.primary} style={styles.icon} />
    ),
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <Box background="lighter">
          <View style={styles.row}>
            {icon[body.title]}
            <Title primary text={body.title} />
          </View>
        </Box>
        <Box>
          {body.sections.map(section => (
            <React.Fragment key={section.title}>
              <Title level={4} margin text={section.title} />
              <RenderHTML
                contentWidth={width}
                source={{html: section.html}}
                systemFonts={[font.weight.regular, font.weight.demi]}
                tagsStyles={tagsStyles}
              />
            </React.Fragment>
          ))}
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
