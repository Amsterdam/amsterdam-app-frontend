import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import {StackNavigationOptions} from '@react-navigation/stack'
import React from 'react'
import {ProjectMinimal} from '../../modules/projects/screens/create-notification'
import {ProjectDetailBody} from '../../types'

export type StackNavigationRoutes<R, Route extends string = string> = Record<
  Route,
  {
    component?: React.ComponentType<any> //TODO This shouldn't be optional, wait until route definitions are updated
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
  HomeTab: {screen?: keyof HomeStackParams | keyof SharedStackParams}
  MenuTab: {screen?: keyof MenuStackParams | keyof SharedStackParams}
}

export type HomeStackParams = {
  AuthorizedProjects: {projectManagerId: string}
  Home: undefined
  Modules: undefined
  SelectModules: undefined
}

export type MenuStackParams = {
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
  WasteGuideModule: undefined
  WasteMenu: undefined
  WhereToPutBulkyWaste: undefined
}

export type StackParams = HomeStackParams & MenuStackParams & SharedStackParams
