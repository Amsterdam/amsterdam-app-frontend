import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native'
import {RenderHTML} from 'react-native-render-html'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Title} from '../components/ui'
import {tagsStyles} from '../styles/html'
import {font} from '../tokens'

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
      title: body.projectTitle.substr(0, 24),
    })
  })

  return (
    <ScreenWrapper>
      <ScrollView>
        <Box background="lighter">
          <View style={styles.row}>
            {body.icon}
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
  row: {
    flexDirection: 'row',
  },
})
