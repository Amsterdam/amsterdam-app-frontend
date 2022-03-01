import {useContext, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {SettingsContext} from '../../providers'
import {setCredentials} from '../../store/authSlice'
import {encryptWithAES} from '../../utils'

export const Init = () => {
  const dispatch = useDispatch()
  const {changeSettings, removeSetting, settings} = useContext(SettingsContext)
  const projectManager = settings?.['project-manager']
  const notificationSettings = settings?.notifications ?? {}

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
            salt: id,
          }),
        }),
      )
    }
  }, [projectManager, dispatch])

  useEffect(() => {
    if (projectManager) {
      // const obj = projectManager.projects.reduce(
      //   (o, key) => Object.assign(o, {[key]: true}),
      //   {},
      // )

      changeSettings('notifications', {
        ...notificationSettings,
        projectsEnabled: true,
        // projects: {
        //   ...notificationSettings.projects,
        //   obj,
        // },
      })
    }
  }, [projectManager]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
