import {useContext, useEffect} from 'react'
import {SettingsContext} from '../../providers'

export const Init = () => {
  const {removeSetting} = useContext(SettingsContext)

  useEffect(() => {
    removeSetting('temp')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
