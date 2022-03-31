import {useContext, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {SettingsContext} from '../../providers'
import {setCredentials} from '../../store/authSlice'
import {encryptWithAES} from '../../utils'

export const Init = () => {
  const dispatch = useDispatch()
  const {settings} = useContext(SettingsContext)
  const projectManager = settings?.['project-manager']

  useEffect(() => {
    if (projectManager) {
      const {id} = projectManager
      dispatch(
        setCredentials({
          managerToken: encryptWithAES({
            password: process.env.AUTH_PASSWORD ?? '',
            salt: id,
          }),
        }),
      )
    }
  }, [projectManager, dispatch])

  return null
}
