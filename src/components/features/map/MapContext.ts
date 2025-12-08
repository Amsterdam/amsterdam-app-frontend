import {createContext} from 'react'
import type {RefObject} from 'react'
import type MapView from 'react-native-maps'

export const MapContext = createContext<RefObject<MapView | null> | null>(null)
