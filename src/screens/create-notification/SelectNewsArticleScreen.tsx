import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'
import {ValidationWarning} from '../../components/features/form'
import {
  Box,
  Button,
  Gutter,
  Radio,
  RadioGroup,
  Row,
  ScrollView,
  Text,
  TextButton,
  Title,
} from '../../components/ui'
import {SubmitButton} from '../../components/ui'
import {Stretch} from '../../components/ui/Layout/Stretch'
import {getEnvironment} from '../../environment'
import {useFetch} from '../../hooks'
import {size} from '../../tokens'
import {NewsArticleList} from '../../types'
import {NotificationContext, NotificationStackParamList} from '.'

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

  const {data: news} = useFetch<NewsArticleList>({
    url: getEnvironment().apiUrl + '/project/news',
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
          <Title margin text="Kies een bericht" />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <RadioGroup
                accessibilityLabel="Kies een nieuwsbericht"
                name="news"
                onChange={val => onChange(val)}>
                {news.map((newsArticle, index) => (
                  <Radio
                    isChecked={newsArticle.identifier === watchRadioGroup}
                    isFirst={index === 0}
                    key={newsArticle.identifier}
                    value={newsArticle.identifier}>
                    <Text>{newsArticle.title}</Text>
                  </Radio>
                ))}
              </RadioGroup>
            )}
            name="news"
            rules={{required: 'Kies een nieuwsartikel'}}
          />
          {errors.news && (
            <ValidationWarning warning="Kies een nieuwsartikel" />
          )}
          <Gutter height={size.spacing.md} />
          <View style={styles.button}>
            <Button
              onPress={() => navigation.navigate('WarningForm')}
              text="Schrijf een bericht"
            />
          </View>
        </Box>
      </Stretch>
      <Box>
        <Row align="end-or-between" valign="center">
          <TextButton
            direction="backward"
            onPress={navigation.goBack}
            text="Vorige"
          />
          <SubmitButton onPress={handleSubmit(onSubmit)} text="Controleer" />
        </Row>
        <Gutter height={size.spacing.xl} />
      </Box>
    </ScrollView>
  ) : null
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})
