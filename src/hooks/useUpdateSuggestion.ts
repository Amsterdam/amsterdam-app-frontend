import {useCallback, useEffect} from 'react'
import {Alert} from 'react-native'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAppState} from '@/hooks/useAppState'
import {useOpenStore} from '@/hooks/useOpenStore'
import {
  setLastSeenTimestamp,
  useLastSeenTimestamp,
} from '@/store/slices/updateApp'
import {shouldShowUpdateSuggestion} from '@/utils/shouldShowUpdateSuggestion'

export const useUpdateSuggestion = (
  snoozeTimeInHours: number,
  latestVersion?: string,
  isDeprecated?: boolean,
  isSupported?: boolean,
) => {
  const lastSeenTimestamp = useLastSeenTimestamp()
  const dispatch = useDispatch()
  const openStore = useOpenStore()

  const showUpdateSuggestion = useCallback(() => {
    if (
      !isDeprecated ||
      !isSupported ||
      !shouldShowUpdateSuggestion(snoozeTimeInHours, lastSeenTimestamp)
    ) {
      return
    }

    dispatch(setLastSeenTimestamp)

    Alert.alert(
      'Update de app',
      latestVersion
        ? `Versie ${latestVersion} is beschikbaar.`
        : 'Een nieuwe versie is beschikbaar.',
      [
        {
          text: 'Annuleer',
          style: 'cancel',
        },
        {
          text: 'Nu updaten',
          onPress: openStore,
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    )
  }, [
    isDeprecated,
    isSupported,
    snoozeTimeInHours,
    lastSeenTimestamp,
    dispatch,
    latestVersion,
    openStore,
  ])

  useAppState({
    onForeground: showUpdateSuggestion,
  })

  useEffect(showUpdateSuggestion, [showUpdateSuggestion])
}
