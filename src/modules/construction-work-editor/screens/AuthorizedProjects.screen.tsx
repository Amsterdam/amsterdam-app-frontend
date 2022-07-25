import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  selectConstructionWorkEditorHasSeenWelcomeMessage,
  setHasSeenWelcomeMessage,
} from '../slice'
import {Alert} from '@/components/ui'
import {Screen} from '@/components/ui/layout'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components'
import {setAlert} from '@/store'
import {Variant} from '@/types'

export const AuthorizedProjectsScreen = () => {
  const dispatch = useDispatch()
  const hasSeenWelcomeMessage = useSelector(
    selectConstructionWorkEditorHasSeenWelcomeMessage,
  )

  useEffect(() => {
    if (!hasSeenWelcomeMessage) {
      dispatch(
        setAlert({
          content: {
            text: 'Gelukt, de app herkent je nu als omgevingsmanager voor onderstaande projecten. Klik op het project waarvoor je een bericht wilt plaatsen, om een bericht te maken.',
          },
          variant: Variant.information,
          isVisible: true,
        }),
      )
      dispatch(setHasSeenWelcomeMessage())
    }
  }, [dispatch, hasSeenWelcomeMessage])

  return (
    <Screen scroll={false} stickyHeader={<Alert />}>
      <AuthorizedProjects />
    </Screen>
  )
}
