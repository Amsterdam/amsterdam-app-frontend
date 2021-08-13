import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native'
import {RenderHTML} from 'react-native-render-html'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Title} from '../components/ui'
import {tagsStyles} from '../styles/html'
import {color, font, size} from '../tokens'

type ProjectDetailInformationScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetailInformation'
>

type Props = {
  route: ProjectDetailInformationScreenRouteProp
}

export const ProjectDetailInformationScreen = ({route}: Props) => {
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
            <Info fill={color.font.primary} style={styles.icon} />
            <Title primary text="Informatie" />
          </View>
        </Box>
        <Box>
          {project.body.what.map(section => (
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
