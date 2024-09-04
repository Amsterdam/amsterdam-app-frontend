import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {ComponentType, ReactNode} from 'react'
import {SvgProps} from 'react-native-svg'
import {ScreenProps} from '@/components/features/screen/Screen'

export type ErrorType = FetchBaseQueryError | SerializedError | undefined

export type FullScreenErrorProps = {
  Image: ComponentType<SvgProps>
  TopComponent?: ReactNode
  buttonAccessibilityLabel?: string
  buttonLabel: string
  error?: ErrorType
  onPress: () => void
  text?: string
  title: string
  withFacadesBackground?: boolean
} & Omit<ScreenProps, 'children'>

export type SharedProps = {
  TopComponent: FullScreenErrorProps['TopComponent']
  error: FullScreenErrorProps['error']
  isPortrait: boolean
  testID: FullScreenErrorProps['testID']
  text: FullScreenErrorProps['text']
  title: FullScreenErrorProps['title']
}
