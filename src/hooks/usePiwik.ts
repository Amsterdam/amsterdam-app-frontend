import {useContext} from 'react'
import {PiwikContext} from '@/providers'

export const usePiwik = () => useContext(PiwikContext)
