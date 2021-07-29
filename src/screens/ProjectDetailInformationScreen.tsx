import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Section, Text, Title} from '../components/ui'
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
          {project.body.what ? (
            <Section
              title={project.body.what.title}
              text={project.body.what.text}
            />
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
