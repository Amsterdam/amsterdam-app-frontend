import React, {Component, ReactNode} from 'react'
import {ErrorWithRestart} from '../ui/ErrorWithRestart'
import {devLog} from '@/services'

type Props = {children: ReactNode}

type State = {hasError: boolean}

export class CustomErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error: unknown) {
    devLog(error)
    return {hasError: true}
  }

  render() {
    return this.state.hasError ? <ErrorWithRestart /> : this.props.children
  }
}
