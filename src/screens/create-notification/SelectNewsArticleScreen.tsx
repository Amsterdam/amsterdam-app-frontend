import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'
import {FormButtons, ValidationWarning} from '../../components/features/form'
import {
  Box,
  Button,
  Gutter,
  Link,
  Radio,
  RadioGroup,
  Text,
  Title,
} from '../../components/ui'
import {Stretch} from '../../components/ui/Layout/Stretch'
import {getEnvironment} from '../../environment'
import {useFetch} from '../../hooks'
import {size} from '../../tokens'
import {NewsArticleList} from '../../types'
import {PushNotificationContext, PushNotificationStackParamList} from '.'

type Props = {
  navigation: StackNavigationProp<
    PushNotificationStackParamList,
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
  const pushNotificationContext = useContext(PushNotificationContext)

  const {data: news} = useFetch<NewsArticleList>({
    url: getEnvironment().apiUrl + '/project/news',
    options: {
      params: {
        'project-identifier': pushNotificationContext.projectDetails.projectId!,
      },
    },
  })

  const watchRadioGroup = watch('news')

  const onSubmit = (data: FormData) => {
    const newsSelected = news?.find(item => item.identifier === data.news)
    newsSelected &&
      pushNotificationContext.changeNewsDetails({
        newsId: newsSelected?.identifier,
        newsTitle: newsSelected?.title,
      })
    navigation.navigate('VerifyNotification')
  }

  useEffect(() => {
    news?.length === 0 && navigation.navigate('WarningForm')
  }, [navigation, news])

  return news ? (
    <>
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
        <FormButtons>
          <Link
            direction="backward"
            onPress={navigation.goBack}
            text="Vorige"
          />
          <Button
            onPress={handleSubmit(onSubmit)}
            text="Controleer"
            variant="submit"
          />
        </FormButtons>
        <Gutter height={size.spacing.xl} />
      </Box>
    </>
  ) : null
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})
