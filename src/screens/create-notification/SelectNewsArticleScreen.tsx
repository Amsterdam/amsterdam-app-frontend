import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'
import {ValidationWarning} from '../../components/features/form'
import {
  Box,
  Button,
  SubmitButton,
  Text,
  TextButton,
  Title,
} from '../../components/ui'
import {Radio, RadioGroup} from '../../components/ui/forms'
import {
  Column,
  Gutter,
  Row,
  ScrollView,
  Stretch,
} from '../../components/ui/layout'
import {getEnvironment} from '../../environment'
import {useFetch} from '../../hooks'
import {NewsArticle} from '../../types'
import {NotificationContext, NotificationStackParamList} from './'

type Props = {
  navigation: StackNavigationProp<
    NotificationStackParamList,
    'SelectNewsArticle'
  >
}

type FormData = {
  news: string
}

export const SelectNewsArticleScreen = ({navigation}: Props) => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm()
  const notificationContext = useContext(NotificationContext)

  const {data: news} = useFetch<NewsArticle[]>({
    url: getEnvironment().apiUrl + '/project/news_by_project_id',
    options: {
      params: {
        'project-identifier': notificationContext.projectDetails.id!,
      },
    },
  })

  const watchRadioGroup = watch('news')

  const onSubmit = (data: FormData) => {
    const newsSelected = news?.find(item => item.identifier === data.news)
    newsSelected &&
      notificationContext.changeNewsDetails({
        id: newsSelected?.identifier,
        title: newsSelected?.title,
      })
    navigation.navigate('VerifyNotification')
  }

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      notificationContext.changeCurrentStep(2)
    })
    return focusListener
  }, [navigation, notificationContext])

  return news ? (
    <ScrollView keyboardDismiss>
      <Stretch>
        <Box>
          <Column gutter="lg">
            <Title text="Kies een nieuwsartikel" />
            <>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <RadioGroup
                    accessibilityLabel="Selecteer een nieuwsartikel"
                    name="news"
                    onChange={val => onChange(val)}>
                    {news.map((newsArticle, index) => (
                      <Radio
                        isChecked={newsArticle.identifier === watchRadioGroup}
                        isFirst={index === 0}
                        key={newsArticle.identifier}
                        value={newsArticle.identifier}>
                        <Text large>{newsArticle.title}</Text>
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
                name="news"
                rules={{required: 'Kies een nieuwsartikel'}}
              />
              {errors.news && (
                <ValidationWarning warning="Selecteer een nieuwsartikel" />
              )}
            </>
            <View>
              <Title level={4} text="Schrijf een nieuwsartikel" />
              <Text>
                Schrijf een nieuwsartikel met meer informatie. Uw pushbericht
                zal dit nieuwsartikel openen in de app.
              </Text>
              <Gutter height="sm" />
              <View style={styles.justifyStart}>
                <Button
                  onPress={() => navigation.navigate('WarningForm')}
                  text="Schrijf een nieuwsartikel"
                  variant="inverse"
                />
              </View>
            </View>
          </Column>
        </Box>
      </Stretch>
      <Box>
        <Row align="between" valign="center">
          <TextButton
            direction="backward"
            emphasis
            onPress={navigation.goBack}
            text="Vorige"
          />
          <SubmitButton onPress={handleSubmit(onSubmit)} text="Controleer" />
        </Row>
        <Gutter height="xl" />
      </Box>
    </ScrollView>
  ) : null
}

const styles = StyleSheet.create({
  justifyStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})
