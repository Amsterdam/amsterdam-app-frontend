import React, {ReactNode, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useDeviceRegistration, useInitSentry} from '../../hooks'
import {selectProjectManager} from '../../modules/construction-work/components/project-manager'
import {setCredentials} from '../../store/authSlice'
import {encryptWithAES} from '../../utils'
import {useAppState} from '@/hooks/useAppState'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  const dispatch = useDispatch()
  const {id: projectManagerId} = useSelector(selectProjectManager)
  const {deviceRegistration} = useDeviceRegistration()

  useAppState({
    onForeground: () => {
      deviceRegistration()
    },
  })

  useEffect(() => {
    if (projectManagerId) {
      dispatch(
        setCredentials({
          managerToken: encryptWithAES({
            password: process.env.AUTH_PASSWORD ?? '',
            salt: projectManagerId,
          }),
        }),
      )
    }
  }, [dispatch, projectManagerId])

  useInitSentry()

  return <>{children}</>
}
