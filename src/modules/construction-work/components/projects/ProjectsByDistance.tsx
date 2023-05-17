import {Address} from '@/modules/address'
import {StreetAddressWithEditButton} from '@/modules/address/components'
import {Projects} from '@/modules/construction-work/components/projects'
import {getProjectTraits} from '@/modules/construction-work/components/projects/utils/getProjectTraits'
import {recentArticleMaxAge} from '@/modules/construction-work/config'

type Props = {
  address: Address
}

export const ProjectsByDistance = ({address}: Props) => {
  const addressText = address.adres
  // TODO: remove centroid once standardization of address data is done
  const getAddressParam = () => {
    if (address.coordinates) {
      return {
        address: address.coordinates?.lon ? undefined : addressText,
        ...address.coordinates,
      }
    }
    if (address.centroid) {
      return {
        address: address.centroid?.[1] ? undefined : addressText,
        lat: address?.centroid?.[1],
        lon: address?.centroid?.[0],
      }
    }
    return {}
  }

  const addressParam = getAddressParam()
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
          accessibilityLabel={`Werkzaamheden dichtbij ${addressText}`}
          address={`Dichtbij ${addressText}`}
          testIDButton="ConstructionWorkButtonEditAddress"
          testIDLabel="ConstructionWorkTextAddress"
        />
      }
      queryParams={queryParams}
    />
  )
}
