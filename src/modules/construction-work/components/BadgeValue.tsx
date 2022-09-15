import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {Badge} from '@/components/ui'
import {Spinner} from '@/components/ui/feedback'
import {selectAddress} from '@/modules/address/slice'
import {articlesMaxAgeInDays} from '@/modules/construction-work/config'
import {useGetProjectsQuery} from '@/modules/construction-work/service'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/slice'

export const BadgeValue = () => {
  const {primary: address} = useSelector(selectAddress)
  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const {
    centroid: [lon = 0, lat = 0],
    adres: addressText,
  } = address ?? {centroid: [0, 0]}

  const {data: projects} = useGetProjectsQuery({
    address: lat && lon ? '' : addressText,
    articles_max_age: articlesMaxAgeInDays,
    fields: ['followed', 'recent_articles'],
    lat,
    lon,
    sortBy: 'meter',
  })

  const unreadArticlesLength = useMemo(
    () =>
      projects
        ?.filter(project => project.followed)
        ?.reduce((total, {recent_articles}) => {
          const recentArticlesIds =
            recent_articles?.map(r => r.identifier) ?? []
          const readArticlesIds = readArticles.map(r => r.id)

          return (
            recentArticlesIds.filter(id => !readArticlesIds.includes(id))
              .length + total
          )
        }, 0),
    [projects, readArticles],
  )

  if (!unreadArticlesLength) {
    return <Spinner />
  }

  return <Badge value={unreadArticlesLength} />
}
