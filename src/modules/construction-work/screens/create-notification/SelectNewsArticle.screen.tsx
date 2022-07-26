import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Box, Text, Title} from '@/components/ui'
import {Button, SubmitButton, TextButton} from '@/components/ui/buttons'
import {Radio, RadioGroup} from '@/components/ui/forms'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {useGetArticlesQuery} from '@/modules/construction-work/construction-work.service'
import {
  selectProjectId,
  setNewsArticle,
  setStep,
} from '@/modules/construction-work/screens/create-notification/notificationDraftSlice'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from '@/modules/construction-work/screens/create-notification/routes'

type Props = {
  navigation: StackNavigationProp<
    CreateNotificationStackParams,
    CreateNotificationRouteName
  >
}

type FormData = {
  news: string
}

export const SelectNewsArticleScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const projectId = useSelector(selectProjectId)
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm<FormData>()

  const watchRadioGroup = watch('news')

  const {newsArticles} = useGetArticlesQuery(
    {
      projectIds: [projectId!],
    },
    {
      selectFromResult: ({data}) => ({
        newsArticles: data?.filter(article => article.type === 'news'),
      }),
      skip: !projectId,
    },
  )

  const onSubmit: SubmitHandler<FormData> = data => {
    const newsSelected = newsArticles?.find(
      item => item.identifier === data.news,
    )
    newsSelected &&
      dispatch(
        setNewsArticle({
          id: newsSelected?.identifier,
          title: newsSelected?.title,
        }),
      )
    navigation.navigate(CreateNotificationRouteName.verifyNotification)
  }

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(setStep(2))
    })
    return focusListener
  }, [dispatch, navigation])

  return newsArticles ? (
    <Screen>
      <Column align="between" gutter="xl">
        <Box>
          <Column gutter="xl">
            <>
              <Title margin text="Kies een optie" />
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <RadioGroup
                    accessibilityLabel="Selecteer een bestaand nieuwsartikel"
                    name="news"
                    onChange={val => onChange(val)}>
                    {newsArticles
                      .filter(article => article.type === 'news')
                      .map(newsArticle => (
                        <Radio
                          isChecked={newsArticle.identifier === watchRadioGroup}
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
                <Paragraph color="warning">
                  Selecteer een nieuwsartikel
                </Paragraph>
              )}
            </>
            <Column gutter="md">
              <View>
                <Title level={4} margin text="Schrijf zelf een nieuwsartikel" />
                <Text>
                  Leg uit wat je de Amsterdammer via het pushbericht wilt laten
                  weten.
                </Text>
              </View>
              <View style={styles.justifyStart}>
                <Button
                  label="Schrijf een nieuwsartikel"
                  onPress={() =>
                    navigation.navigate(
                      CreateNotificationRouteName.projectWarningForm,
                    )
                  }
                  variant="secondary"
                />
              </View>
            </Column>
          </Column>
        </Box>
        <Box>
          <Row align="between" valign="center">
            <TextButton
              direction="backward"
              emphasis
              label="Vorige"
              onPress={navigation.goBack}
            />
            <SubmitButton onPress={handleSubmit(onSubmit)} label="Controleer" />
          </Row>
        </Box>
      </Column>
    </Screen>
  ) : null
}

const styles = StyleSheet.create({
  justifyStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})
