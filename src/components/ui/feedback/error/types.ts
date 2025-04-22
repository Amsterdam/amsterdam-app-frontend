import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {ComponentType, ReactNode} from 'react'
import {SvgProps} from 'react-native-svg'
import {ColumnProps} from '@/components/ui/layout/Column'
import {TestProps} from '@/components/ui/types'

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
  text?: string
  title: string
  withFacadesBackground?: boolean
} & Omit<ColumnProps, 'children'> &
  TestProps

export type SharedProps = {
  isPortrait: boolean
} & Pick<
  FullScreenErrorProps,
  'TopComponent' | 'error' | 'testID' | 'text' | 'title'
>
