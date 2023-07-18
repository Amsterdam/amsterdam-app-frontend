import {StreetAddressWithEditButton} from '@/modules/address/components'
import {Address} from '@/modules/address/types'
import {Projects} from '@/modules/construction-work/components/projects'
import {getProjectTraits} from '@/modules/construction-work/components/projects/utils/getProjectTraits'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {getAddressParam} from '@/modules/construction-work/utils/getAddressParam'

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
        <StreetAddressWithEditButton
          accessibilityLabel={`Werkzaamheden dichtbij ${address.addressLine1}`}
          address={`Dichtbij ${address.addressLine1}`}
          testIDButton="ConstructionWorkButtonEditAddress"
          testIDLabel="ConstructionWorkTextAddress"
        />
      }
      queryParams={queryParams}
    />
  )
}
