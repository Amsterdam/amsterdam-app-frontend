import React, {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Box, Radio, RadioGroup, Text, Title} from '../../components/ui'
import mockNews from '../../data/mock/news.json'
import {NewsArticleList} from '../../types'

export const SelectNewsArticleScreen = () => {
  const {control, watch} = useForm()
  const news: NewsArticleList = mockNews.result

  const watchRadioGroup = watch('news')

  useEffect(() => {
    console.log({watchRadioGroup})
  }, [watchRadioGroup])

  return (
    <Box>
      <Title text="Kies een bericht" />
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <RadioGroup
            accessibilityLabel="Nieuwsartikelen"
            name="news"
            onChange={val => onChange(val)}>
            {news.map(newsArticle => (
              <Radio
                isChecked={newsArticle.identifier === watchRadioGroup}
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
    </Box>
  )
}
