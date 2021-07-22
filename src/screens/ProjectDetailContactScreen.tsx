import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, Button, ScreenWrapper, Text, Title} from '../components/ui'
import {color, size} from '../tokens'
import {openMailUrl, openPhoneUrl} from '../utils'

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
          <Title text="Contact" />
        </Box>
        <Box>
          <Box background="lighter">
            {project.contact?.list ? (
              project.contact?.list?.map(item => (
                <Text key={item}>– {item}</Text>
              ))
            ) : (
              <>
                {project.contact?.name && (
                  <Title level={4} margin text={project.contact?.name} />
                )}
                {project.contact?.jobDescription && (
                  <Text margin>{project.contact?.jobDescription}</Text>
                )}
                {project.contact?.phone && (
                  <View style={styles.buttonContainer}>
                    <Button
                      icon={<Phone fill={color.font.inverse} />}
                      onPress={() => openPhoneUrl('project.contact?.phone')}
                      text={`Bel ${project.contact?.firstName}`}
                    />
                  </View>
                )}
                {project.contact?.email && (
                  <View style={styles.buttonContainer}>
                    <Button
                      icon={<Email fill={color.font.inverse} />}
                      onPress={() => openMailUrl('project.contact?.email')}
                      text={`E-mail ${project.contact?.firstName}`}
                    />
                  </View>
                )}
              </>
            )}
          </Box>
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: size.spacing.md,
  },
})
