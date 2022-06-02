import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

export enum WasteGuideRouteName {
  bulkyWasteAppointment = 'BulkyWasteAppointment',
  home = 'Home',
  recyclingGuide = 'RecyclingGuide',
  reportNotCollected = 'ReportNotCollected',
  wasteGuideCollectionPoints = 'WasteGuideCollectionPoints',
  wasteGuideContainers = 'WasteGuideContainers',
  wasteGuideFeedback = 'WasteGuideFeedback',
  wasteMenu = 'WasteMenu',
  whereToPutBulkyWaste = 'WhereToPutBulkyWaste',
}

export type WasteGuideStackParams = {
  [WasteGuideRouteName.bulkyWasteAppointment]: {appointmentUrl: string}
  [WasteGuideRouteName.home]: undefined
  [WasteGuideRouteName.recyclingGuide]: undefined
  [WasteGuideRouteName.reportNotCollected]: undefined
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
    name: WasteGuideRouteName.bulkyWasteAppointment,
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Afspraak grof afval ophalen" />
      ),
    },
  },
  [WasteGuideRouteName.home]: {
    name: WasteGuideRouteName.home,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Afvalwijzer" />,
    },
  },
  [WasteGuideRouteName.recyclingGuide]: {
    name: WasteGuideRouteName.recyclingGuide,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Afvalscheidingswijzer" />,
    },
  },
  [WasteGuideRouteName.reportNotCollected]: {
    name: WasteGuideRouteName.reportNotCollected,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Melden" />,
    },
  },
  [WasteGuideRouteName.wasteGuideFeedback]: {
    name: WasteGuideRouteName.wasteGuideFeedback,
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Melden afvalinformatie" />
      ),
    },
  },
  [WasteGuideRouteName.wasteGuideCollectionPoints]: {
    name: WasteGuideRouteName.wasteGuideCollectionPoints,
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Afvalpunten in de buurt" />
      ),
    },
  },
  [WasteGuideRouteName.wasteGuideContainers]: {
    name: WasteGuideRouteName.wasteGuideContainers,
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Containers in de buurt" />
      ),
    },
  },
  [WasteGuideRouteName.wasteMenu]: {
    name: WasteGuideRouteName.wasteMenu,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Menu" />,
    },
  },
  [WasteGuideRouteName.whereToPutBulkyWaste]: {
    name: WasteGuideRouteName.whereToPutBulkyWaste,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Grof afval" />,
    },
  },
}
