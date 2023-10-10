import {ReactNode} from 'react'

export const ErrorBoundary = ({children}: {children: ReactNode}) => children
export const wrap = ({children}: {children: ReactNode}) => children

export const addBreadcrumb = () => null
export const Breadcrumb = () => null
export const captureException = () => null
export const init = () => null
export const ReactNativeTracing = () => null
export const ReactNavigationInstrumentation = class ReactNavigationInstrumentation {}
export const setTag = () => null
export const setUser = () => null
export const withScope = () => null
