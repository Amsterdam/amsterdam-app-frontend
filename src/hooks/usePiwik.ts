import {useContext} from 'react'
import {PiwikContext} from '@/providers/piwik.provider'

export const usePiwik = () => useContext(PiwikContext)
