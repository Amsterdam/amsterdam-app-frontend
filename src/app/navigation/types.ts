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
  AddressForm: undefined
  BestWishes21: undefined
  Home: undefined
  NotificationOverview: undefined
  ProjectOverview: undefined
  Settings: undefined
  WasteGuide: undefined
}

export type MenuStackParams = {
  AddressForm: undefined
  Admin: undefined
  Contact: undefined
  Menu: undefined
  Notification: {projectDetails: ProjectDetails}
  ProjectDetail: {id: string}
  ProjectDetailBody: {body: ProjectDetailBody}
  ProjectManager: {id: string}
  ProjectNews: {id: string}
  ProjectOverview: undefined
  ProjectOverviewByDistrict: {id: number}
  ProjectWarning: {id: string}
  WasteGuide: undefined
  WasteMenu: undefined
  WebView: WebViewRouteParams
  WhereToPutBulkyWaste: undefined
}
