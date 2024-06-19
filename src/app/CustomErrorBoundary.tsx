import {SeverityLevel} from '@microsoft/applicationinsights-web'
import {Component, ReactNode} from 'react'
import {ErrorWithRestart} from '@/components/ui/feedback/ErrorWithRestart'
import {AppInsightsContext} from '@/providers/appinsights.provider'

type Props = {children: ReactNode}

type State = {hasError: boolean}

export class CustomErrorBoundary extends Component<Props, State> {
  static readonly contextType = AppInsightsContext
  declare context: React.ContextType<typeof AppInsightsContext>

  constructor(props: Props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(_error: unknown) {
    return {hasError: true}
  }

  componentDidCatch(
    error: Error & {
      cause?: Error
    },
    errorInfo: React.ErrorInfo,
  ) {
    this.context.appInsights.trackException({
      error,
      exception: error,
      properties: errorInfo,
      severityLevel: SeverityLevel.Critical,
    })
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return <ErrorWithRestart />
  }
}
