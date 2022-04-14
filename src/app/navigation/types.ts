import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import {StackNavigationOptions} from '@react-navigation/stack'
import {WebViewRouteParams} from '../../screens'
import {ProjectMinimal} from '../../screens/create-notification'
import {ProjectDetailBody} from '../../types'

export type StackNavigationRoutes<R, Route extends string = string> = Record<
  Route,
  {
    name: keyof R
    options?: StackNavigationOptions
    title?: string
  }
>

export type TabNavigationRoutes<R> = {
  [route: string]: {
    name: keyof R
    options?: BottomTabNavigationOptions
    title?: string
  }
}

export type TabParams = {
  ActionTab: {screen?: keyof ActionStackParams | keyof SharedStackParams}
  HomeTab: {screen?: keyof HomeStackParams | keyof SharedStackParams}
  MenuTab: {screen?: keyof MenuStackParams | keyof SharedStackParams}
}

export type ActionStackParams = {
  ReportIssue: {title: string}
}

export type HomeStackParams = {
  AuthorizedProjects: {projectManagerId: string}
  Home: undefined
}

export type MenuStackParams = {
  Contact: undefined
  Menu: undefined
  WritingGuide: undefined
}

export type SharedStackParams = {
  AddressInfo: undefined
  AddressForm: {temp?: boolean}
  Notification: {projectDetails: ProjectMinimal}
  NotificationOverview: undefined
  ProjectDetail: {id: string}
  ProjectDetailBody: {body: ProjectDetailBody}
  ProjectManager: {id: string}
  ProjectNews: {id: string}
  Projects: undefined
  ProjectWarning: {id: string}
  Settings: undefined
  WasteGuide: undefined
  WasteMenu: undefined
  WebView: WebViewRouteParams
  WhereToPutBulkyWaste: undefined
}

export type StackParams = ActionStackParams &
  HomeStackParams &
  MenuStackParams &
  SharedStackParams
