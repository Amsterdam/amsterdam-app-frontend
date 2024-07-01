import {Alert} from 'react-native'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {redirects} from '@/modules/redirects/data/redirects'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export const Redirects = () => {
  const openWebUrl = useOpenWebUrl()
  const navigation = useNavigation<RedirectsRouteName>()

  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

  return (
    <Column gutter="md">
      {isLoading ? (
        <PleaseWait testID="RedirectsPleaseWait" />
      ) : isError ? (
        <SomethingWentWrong />
      ) : (
        redirects.map(({iconName, routeName, testID, text, title, urlKey}) => (
          <TopTaskButton
            accessibilityLabel={accessibleText(title, text)}
            accessibilityRole={routeName ? 'button' : 'link'}
            iconName={iconName}
            key={iconName}
            onPress={() => {
              if (routeName) {
                navigation.navigate(routeName)
              } else if (urlKey && redirectUrls?.[urlKey]) {
                openWebUrl(redirectUrls[urlKey])
              } else {
                Alert.alert('Sorry, deze functie is niet beschikbaar.')
                trackException(
                  ExceptionLogKey.redirectNotFound,
                  'Redirects.tsx',
                  {
                    urlKey,
                  },
                )
              }
            }}
            testID={testID}
            text={text}
            title={title}
          />
        ))
      )}
    </Column>
  )
}
