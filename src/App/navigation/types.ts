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
}

export type MenuStackParams = {
  AddressForm: undefined
  Contact: undefined
  Menu: undefined
  Notification: {projectDetails: ProjectDetails}
  NotificationOverview: undefined
  ProjectDetail: {id: string}
  ProjectDetailBody: {body: ProjectDetailBody}
  ProjectManager: {id: string}
  ProjectNews: {id: string}
  ProjectOverview: undefined
  ProjectOverviewByDistrict: {id: number}
  ProjectWarning: {id: string}
  Settings: undefined
  Waste: undefined
  WasteMenu: undefined
  WebView: WebViewRouteParams
  WhereToPutBulkyWaste: undefined
}
