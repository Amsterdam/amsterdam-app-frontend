import {useCallback} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {RedirectKey} from '@/modules/redirects/types'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'

export const RequestCityPass = () => {
  const openWebUrl = useOpenWebUrl()

  const {data: redirectUrls} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()
  const requestCityPass = useCallback(() => {
    if (redirectUrls?.[RedirectKey.cityPassRequest]) {
      openWebUrl(redirectUrls[RedirectKey.cityPassRequest])
    } else {
      Alert.alert('Sorry, deze functie is niet beschikbaar.')
      trackException(ExceptionLogKey.redirectNotFound, 'Redirects.tsx', {
        urlKey: RedirectKey.cityPassRequest,
      })
    }
  }, [openWebUrl, redirectUrls, trackException])

  return (
    <>
      <Title text="Stadspas" />
      <Gutter height="sm" />
      <Paragraph>
        De Stadspas is voor Amsterdammers met een laag inkomen en weinig
        vermogen. Met de Stadspas kunt u gratis of met korting leuke
        activiteiten doen.
      </Paragraph>
      <Gutter height="lg" />
      <Button
        accessibilityRole="link"
        label="Stadspas aanvragen"
        onPress={requestCityPass}
        testID="CityPassLoginButton"
        variant="secondary"
      />
    </>
  )
}
