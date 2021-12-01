import {RouteProp} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, Button, Image, PleaseWait, Text, Title} from '../components/ui'
import {Row, ScrollView} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {color} from '../tokens'
import {Warning} from '../types'
import {formatDate} from '../utils'

type ProjectWarningScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectWarning'
>

type Props = {
  route: ProjectWarningScreenRouteProp
}

export const ProjectWarningScreen = ({route}: Props) => {
  const [warning, setWarning] = useState<Warning | undefined>()

  const api = useFetch<Warning>({
    url: getEnvironment().apiUrl + '/project/warning',
    options: {
      params: {
        id: route.params.id,
      },
    },
  })

  useEffect(() => {
    if (api.data) {
      setWarning(api.data)
    }
  }, [api.data])

  return warning ? (
    <ScrollView>
      <Image
        source={require('../assets/images/warning-hero.png')}
        style={styles.image}
      />
      <Box background="white">
        <Text margin secondary>
          {formatDate(warning.publication_date)}
        </Text>
        <Title margin text={warning.title} />
        <Text intro margin>
          {warning.body.preface}
        </Text>
        <Text margin>{warning.body.content}</Text>
      </Box>
      <Box>
        <Box background="white">
          <Row>
            <Button text={warning.author_email} />
          </Row>
        </Box>
      </Box>
    </ScrollView>
  ) : (
    <PleaseWait />
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 371 / 165,
    width: '100%',
    flexShrink: 1,
  },
})
