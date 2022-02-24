import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import {StackNavigationOptions} from '@react-navigation/stack'
import {WebViewRouteParams} from '../../screens'
import {ProjectDetails} from '../../screens/create-notification'
import {ProjectDetailBody} from '../../types'

export type StackNavigationRoutes<R> = {
  [route: string]: {
    name: keyof R
    options?: StackNavigationOptions
    title?: string
  }
}

export type TabNavigationRoutes<R> = {
  [route: string]: {
    name: keyof R
    options?: BottomTabNavigationOptions
    title?: string
  }
}

export type TabParams = {
  ActionTab: {screen?: keyof ActionStackParams}
  HomeTab: {screen?: keyof HomeStackParams}
  MenuTab: {screen?: keyof MenuStackParams}
}

export type ActionStackParams = {
  ReportIssue: {title: string}
}

export type HomeStackParams = {
  AuthorizedProjects: {projectManagerId: string}
  Home: undefined
}

export type MenuStackParams = {
  Admin: undefined
  Contact: undefined
  Menu: undefined
}

export type SharedStackParams = {
  AddressInfo: undefined
  AddressForm: {tempAddress?: boolean}
  Notification: {projectDetails: ProjectDetails}
  NotificationOverview: undefined
  ProjectDetail: {id: string}
  ProjectDetailBody: {body: ProjectDetailBody}
  ProjectManager: {id: string}
  ProjectNews: {id: string}
  Projects: undefined
  ProjectsForDistrict: {id: number}
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
