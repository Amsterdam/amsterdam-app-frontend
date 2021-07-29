import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Section, Text, Title} from '../components/ui'
import {color, font, size} from '../tokens'

type ProjectDetailWorkScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetailWork'
>

type Props = {
  route: ProjectDetailWorkScreenRouteProp
}

export const ProjectDetailWorkScreen = ({route}: Props) => {
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
            <LocationFields fill={color.font.primary} style={styles.icon} />
            <Title primary text="Werkzaamheden" />
          </View>
        </Box>
        <Box>
          {project.body.work ? (
            <Section
              title={project.body.work.title}
              text={project.body.work.text}
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
