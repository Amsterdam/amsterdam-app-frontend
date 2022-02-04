import {useContext, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {SettingsContext} from '../../providers'
import {setCredentials} from '../../store/authSlice'
import {encryptWithAES} from '../../utils'

export const Init = () => {
  const dispatch = useDispatch()
  const {removeSetting, settings} = useContext(SettingsContext)
  const projectManager = settings?.['project-manager']

  useEffect(() => {
    removeSetting('temp')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (projectManager) {
      const {id} = projectManager
      dispatch(
        setCredentials({
          managerToken: encryptWithAES({
            password: '6886b31dfe27e9306c3d2b553345d9e5',
            plaintext: id,
          }),
        }),
      )
    }
  }, [projectManager, dispatch])

  return null
}
