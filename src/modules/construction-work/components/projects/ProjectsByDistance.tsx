import {ChangeLocationButton} from '@/modules/address/components/location/ChangeLocationButton'
import {Address} from '@/modules/address/types'
import {getAddressParam} from '@/modules/address/utils/getAddressParam'
import {Projects} from '@/modules/construction-work/components/projects/Projects'
import {getProjectTraits} from '@/modules/construction-work/components/projects/utils/getProjectTraits'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {ModuleSlug} from '@/modules/slugs'

type Props = {
  address: Address
}

export const ProjectsByDistance = ({address}: Props) => {
  const addressParam = getAddressParam(address)
  const queryParams = {
    ...addressParam,
    articles_max_age: recentArticleMaxAge,
    fields: [
      'followed',
      'identifier',
      'images',
      'publication_date',
      'recent_articles',
      'subtitle',
      'title',
    ],
  }

  return (
    <Projects
      getProjectTraits={getProjectTraits}
      HeaderButton={
        <ChangeLocationButton
          slug={ModuleSlug['construction-work']}
          testID="ConstructionWork"
        />
      }
      queryParams={queryParams}
    />
  )
}
