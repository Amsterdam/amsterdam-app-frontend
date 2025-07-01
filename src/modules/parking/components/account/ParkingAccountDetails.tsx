import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {RedirectKey} from '@/modules/redirects/types'
import {capitalizeString} from '@/utils/capitalizeString'

export const ParkingAccountDetails = () => {
  const {data, isLoading} = useAccountDetailsQuery()
  const name = data
    ? `${data?.initials ?? ''} ${data?.last_name ?? ''}`.trim()
    : ' '
  const address = data?.address
    ? `${data.address.street} ${data.address.house_number}${data.address.house_letter}\n${data.address.zip_code} ${capitalizeString(data.address.city.toLowerCase())}`
    : '\n'
  const {redirectUrls, openRedirect} = useOpenRedirect()

  return (
    <Column gutter="lg">
      <Title
        level="h2"
        text="Uw gegevens"
      />
      <SingleSelectable>
        <Phrase>Naam</Phrase>
        <Skeleton isLoading={isLoading}>
          <Phrase emphasis="strong">{name}</Phrase>
        </Skeleton>
      </SingleSelectable>
      <SingleSelectable>
        <Phrase>Adres</Phrase>
        <Skeleton isLoading={isLoading}>
          <Phrase emphasis="strong">{address}</Phrase>
        </Skeleton>
      </SingleSelectable>
      {!!redirectUrls?.[RedirectKey.parking] && (
        <Paragraph>
          Wilt u een verhuizing doorgeven? Neem contact met ons op of lees meer
          op{' '}
          <InlineLink
            onPress={() => openRedirect(RedirectKey.parking)}
            testID="ParkingAccountDetailsRedirectLink">
            {redirectUrls[RedirectKey.parking]}
          </InlineLink>
        </Paragraph>
      )}
    </Column>
  )
}
