import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {ComponentType, ReactNode} from 'react'
import {SvgProps} from 'react-native-svg'
import {ColumnProps} from '@/components/ui/layout/Column'

export type ErrorType = FetchBaseQueryError | SerializedError | undefined

export type FullScreenErrorProps = {
  Image: ComponentType<SvgProps>
  TopComponent?: ReactNode
  backgroundPosition?: 'bottom' | 'center'
  buttonAccessibilityLabel?: string
  buttonLabel: string
  error?: ErrorType
  isImageFullSize?: boolean
  onPress: () => void
  testID: string
  text?: string
  title: string
  withFacadesBackground?: boolean
} & Omit<ColumnProps, 'children'>

export type SharedProps = {
  TopComponent: FullScreenErrorProps['TopComponent']
  error: FullScreenErrorProps['error']
  isPortrait: boolean
  testID: FullScreenErrorProps['testID']
  text: FullScreenErrorProps['text']
  title: FullScreenErrorProps['title']
}
