import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import {useNavigation} from '@react-navigation/native'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import HeroImage from '../../../assets/images/project-warning-hero.svg'
import {useGetProjectQuery, useGetProjectWarningQuery} from '../../../services'
import {color} from '../../../tokens'
import {ProjectWarningImage} from '../../../types'
import {
  formatDate,
  formatTime,
  mapWarningImageSources,
  openMailUrl,
} from '../../../utils'
import {
  Box,
  Button,
  Image,
  NonScalingHeaderTitle,
  PleaseWait,
  Text,
  Title,
} from '../../ui'
import {Row, ScrollView} from '../../ui/layout'
import {useNotificationState} from '../notifications'

type Props = {
  id: string
}

export const ProjectWarning = ({id}: Props) => {
  const navigation = useNavigation()
  const notificationState = useNotificationState()
  const [mainImage, setMainImage] = useState<ProjectWarningImage | undefined>(
    undefined,
  )

  const {data: projectWarning, isLoading: projectWarningIsLoading} =
    useGetProjectWarningQuery({id})

  const {data: project, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: projectWarning?.project_identifier!,
    },
    {skip: !projectWarning},
  )

  useEffect(() => {
    const mainImageFromProjectWarning = projectWarning?.images?.find(
      image => image.main,
    )
    mainImageFromProjectWarning && setMainImage(mainImageFromProjectWarning)
  }, [projectWarning])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={project?.title ?? ''} />,
    })
  })

  if (projectWarningIsLoading || projectIsLoading || !projectWarning) {
    return <PleaseWait />
  }

  notificationState.markAsRead(projectWarning.identifier)

  return (
    <ScrollView>
      <View>
        {mainImage ? (
          <Image
            accessible
            accessibilityLabel={mainImage.description}
            source={mapWarningImageSources(mainImage.sources)}
          />
        ) : (
          <View style={styles.image}>
            <HeroImage />
          </View>
        )}
      </View>
      <Box background="white">
        <Text margin secondary>
          {formatDate(projectWarning.publication_date)}{' '}
          {formatTime(projectWarning.publication_date)}
        </Text>
        <Title margin text={projectWarning.title} />
        <Text intro margin>
          {projectWarning.body.preface}
        </Text>
        <Text margin>{projectWarning.body.content}</Text>
      </Box>
      <Box>
        <Box background="white">
          <Row>
            <Button
              icon={<Email fill={color.font.inverse} />}
              onPress={() => openMailUrl(projectWarning.author_email)}
              text={projectWarning.author_email}
            />
          </Row>
        </Box>
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 378 / 167,
  },
})
