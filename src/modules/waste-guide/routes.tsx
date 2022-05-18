import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type WasteGuideStackParams = {
  BulkyWasteAppointment: {appointmentUrl: string}
  RecyclingGuide: undefined
  ReportNotCollected: undefined
  WasteGuide: undefined
  WasteGuideCollectionPoints: undefined
  WasteGuideContainers: undefined
  WasteGuideFeedback: undefined
  WasteMenu: undefined
  WhereToPutBulkyWaste: undefined
}

export const wasteGuideRoutes: StackNavigationRoutes<
  WasteGuideStackParams,
  | 'bulkyWasteAppointment'
  | 'recyclingGuide'
  | 'reportNotCollected'
  | 'wasteGuide'
  | 'wasteGuideCollectionPoints'
  | 'wasteGuideContainers'
  | 'wasteGuideFeedback'
  | 'wasteMenu'
  | 'whereToPutBulkyWaste'
> = {
  bulkyWasteAppointment: {
    name: 'BulkyWasteAppointment',
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Afspraak grof afval ophalen" />
      ),
    },
  },
  recyclingGuide: {
    name: 'RecyclingGuide',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Afvalscheidingswijzer" />,
    },
  },
  reportNotCollected: {
    name: 'ReportNotCollected',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Melden" />,
    },
  },
  wasteGuideFeedback: {
    name: 'WasteGuideFeedback',
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Melden afvalinformatie" />
      ),
    },
  },
  wasteGuide: {
    name: 'WasteGuide',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Afvalwijzer" />,
    },
  },
  wasteGuideCollectionPoints: {
    name: 'WasteGuideCollectionPoints',
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Afvalpunten in de buurt" />
      ),
    },
  },
  wasteGuideContainers: {
    name: 'WasteGuideContainers',
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Containers in de buurt" />
      ),
    },
  },
  wasteMenu: {
    name: 'WasteMenu',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Menu" />,
    },
  },
  whereToPutBulkyWaste: {
    name: 'WhereToPutBulkyWaste',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Grof afval" />,
    },
  },
}
