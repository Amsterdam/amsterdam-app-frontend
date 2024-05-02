import {FC, ReactNode, useCallback, useEffect, useMemo} from 'react'
import {WebViewMessageEvent} from 'react-native-webview'
import {WebView} from '@/components/ui/containers/WebView'
import {Column} from '@/components/ui/layout/Column'
import {Screen, ScreenProps} from '@/components/ui/layout/Screen'
import {TestProps} from '@/components/ui/types'
import {GlobalApiSlug} from '@/environment'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  saveConstructionWorkEditorToken,
  selectConstructionWorkEditorAccessToken,
} from '@/modules/construction-work-editor/slice'
import {ModuleSlug} from '@/modules/slugs'
import {selectApi} from '@/store/slices/environment'
import {addAuthorizedModule} from '@/store/slices/modules'

const checkIsTokenValid = (token: string | undefined) => !!token

type Props = {
  children: ReactNode
} & TestProps

export const LoginBoundary: FC<Props> = ({children, testID}) => {
  const dispatch = useDispatch()
  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const data = JSON.parse(event.nativeEvent.data) as {accessToken?: string}

      if (data.accessToken) {
        dispatch(saveConstructionWorkEditorToken(data.accessToken))
      }
    },
    [dispatch],
  )
  const token = useSelector(selectConstructionWorkEditorAccessToken)

  useEffect(() => {
    dispatch(addAuthorizedModule(ModuleSlug['construction-work-editor']))
  }, [dispatch])

  const url = useSelector(selectApi(GlobalApiSlug.admin, ''))
  const isTokenValid = useMemo(() => checkIsTokenValid(token), [token])

  if (isTokenValid) {
    return <>{children}</>
  }

  return (
    <Screen testID={testID}>
      <Column grow>
        <WebView
          grow
          onMessage={onMessage}
          testID="ConstructionWorkEditorLoginWebView"
          url={url}
        />
      </Column>
    </Screen>
  )
}

export const LoginBoundaryScreen: FC<ScreenProps> = ({
  children,
  testID,
  ...props
}) => (
  <LoginBoundary testID={testID}>
    <Screen
      testID={testID}
      {...props}>
      {children}
    </Screen>
  </LoginBoundary>
)
