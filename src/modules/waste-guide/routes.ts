import {StackNavigationRoutes} from '../../app/navigation'
import {
  BulkyWasteAppointmentScreen,
  RecyclingGuideScreen,
  ReportNotCollectedScreen,
  WasteGuideCollectionPointsScreen,
  WasteGuideContainersScreen,
  WasteGuideFeedbackScreen,
  WasteGuideScreen,
  WasteMenuScreen,
  WhereToPutBulkyWasteScreen,
} from './screens'

export enum WasteGuideRouteName {
  bulkyWasteAppointment = 'BulkyWasteAppointment',
  recyclingGuide = 'RecyclingGuide',
  reportNotCollected = 'ReportNotCollected',
  wasteGuide = 'WasteGuide',
  wasteGuideCollectionPoints = 'WasteGuideCollectionPoints',
  wasteGuideContainers = 'WasteGuideContainers',
  wasteGuideFeedback = 'WasteGuideFeedback',
  wasteMenu = 'WasteMenu',
  whereToPutBulkyWaste = 'WhereToPutBulkyWaste',
}

export type WasteGuideStackParams = {
  [WasteGuideRouteName.bulkyWasteAppointment]: {appointmentUrl: string}
  [WasteGuideRouteName.recyclingGuide]: undefined
  [WasteGuideRouteName.reportNotCollected]: undefined
  [WasteGuideRouteName.wasteGuide]: undefined
  [WasteGuideRouteName.wasteGuideCollectionPoints]: undefined
  [WasteGuideRouteName.wasteGuideContainers]: undefined
  [WasteGuideRouteName.wasteGuideFeedback]: undefined
  [WasteGuideRouteName.wasteMenu]: undefined
  [WasteGuideRouteName.whereToPutBulkyWaste]: undefined
}

export const wasteGuideRoutes: StackNavigationRoutes<
  WasteGuideStackParams,
  WasteGuideRouteName
> = {
  [WasteGuideRouteName.bulkyWasteAppointment]: {
    component: BulkyWasteAppointmentScreen,
    name: WasteGuideRouteName.bulkyWasteAppointment,
    options: {
      headerTitle: 'Afspraak grof afval ophalen',
    },
  },
  [WasteGuideRouteName.recyclingGuide]: {
    component: RecyclingGuideScreen,
    name: WasteGuideRouteName.recyclingGuide,
    options: {
      headerTitle: 'Afvalscheidingswijzer',
    },
  },
  [WasteGuideRouteName.reportNotCollected]: {
    component: ReportNotCollectedScreen,
    name: WasteGuideRouteName.reportNotCollected,
    options: {
      headerTitle: 'Melden',
    },
  },
  [WasteGuideRouteName.wasteGuide]: {
    component: WasteGuideScreen,
    name: WasteGuideRouteName.wasteGuide,
    options: {
      headerTitle: 'Afvalwijzer',
    },
  },
  [WasteGuideRouteName.wasteGuideFeedback]: {
    component: WasteGuideFeedbackScreen,
    name: WasteGuideRouteName.wasteGuideFeedback,
    options: {
      headerTitle: 'Melden afvalinformatie',
    },
  },
  [WasteGuideRouteName.wasteGuideCollectionPoints]: {
    component: WasteGuideCollectionPointsScreen,
    name: WasteGuideRouteName.wasteGuideCollectionPoints,
    options: {
      headerTitle: 'Afvalpunten in de buurt',
    },
  },
  [WasteGuideRouteName.wasteGuideContainers]: {
    component: WasteGuideContainersScreen,
    name: WasteGuideRouteName.wasteGuideContainers,
    options: {
      headerTitle: 'Containers in de buurt',
    },
  },
  [WasteGuideRouteName.wasteMenu]: {
    component: WasteMenuScreen,
    name: WasteGuideRouteName.wasteMenu,
    options: {
      headerTitle: 'Menu',
    },
  },
  [WasteGuideRouteName.whereToPutBulkyWaste]: {
    component: WhereToPutBulkyWasteScreen,
    name: WasteGuideRouteName.whereToPutBulkyWaste,
    options: {
      headerTitle: 'Grof afval',
    },
  },
}
