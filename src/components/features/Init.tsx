import {FC, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useInitSentry} from '../../hooks'
import {selectProjectManager} from '../../modules/projects/components/project-manager'
import {setCredentials} from '../../store/authSlice'
import {encryptWithAES} from '../../utils'

export const Init: FC = () => {
  const dispatch = useDispatch()
  const {id: projectManagerId} = useSelector(selectProjectManager)

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

  return null
}
