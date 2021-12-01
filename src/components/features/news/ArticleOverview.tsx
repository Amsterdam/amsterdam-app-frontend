import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {DeviceContext} from '../../../providers'
import {size} from '../../../tokens'
import {ProjectDetailArticlePreview} from '../../../types'
import {Box, Title} from '../../ui'
import {Gutter} from '../../ui/layout'
import {ArticlePreview} from './'

type Props = {
  articles: ProjectDetailArticlePreview[]
}

export const ArticleOverview = ({articles}: Props) => {
  const deviceContext = useContext(DeviceContext)
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectNews'>>()

  if (!articles.length) {
    return null
  }

  // TODO Remove after endpoint updated
  articles.sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1))

  return (
    <Box>
      {/* TODO Move gutter to project detail screen column */}
      <Gutter height={size.spacing.md} />
      <Title level={2} text="Nieuws" />
      <Gutter height={size.spacing.sm} />
      <View style={deviceContext.isLandscape && styles.grid}>
        {articles.map((article, index) => (
          <View
            key={`article-${index}`}
            style={[
              deviceContext.isLandscape && styles.item,
              styles.verticalGutter,
            ]}>
            <ArticlePreview
              article={article}
              onPress={() =>
                navigation.navigate(routes.projectNews.name, {
                  id: article.identifier,
                })
              }
            />
          </View>
        ))}
      </View>
    </Box>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    paddingRight: size.spacing.sm,
  },
  verticalGutter: {
    paddingBottom: size.spacing.sm,
  },
})
