import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import {StackNavigationOptions} from '@react-navigation/stack'
import {WebViewRouteParams} from '../../screens'
import {ProjectDetails} from '../../screens/create-notification'
import {ProjectDetailBody} from '../../types'

export type Routes<R> = {
  [route: string]: {
    name: keyof R
    options?: StackNavigationOptions
    title?: string
  }
}

export type TabNavRoutes<R> = {
  [route: string]: {
    name: keyof R
    options?: BottomTabNavigationOptions
    title?: string
  }
}

export type RootStackParamList = {
  HomeStack: undefined
  MenuStack: undefined
  ReportStack: undefined
}

export type HomeStackParamList = {
  Home: undefined
}

export type MenuStackParamList = {
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

export type ReportStackParamList = {
  ReportIssue: {title: string}
}
