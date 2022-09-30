import {StackNavigationRoutes} from '@/app/navigation'
import {
  WasteGuideModalParams,
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {
  BulkyWasteAppointmentScreen,
  CollectionPointsOnMapScreen,
  ContainersOnMapScreen,
  WasteGuideFeedbackScreen,
  WasteGuideScreen,
  WhereToPutBulkyWasteScreen,
} from '@/modules/waste-guide/screens'

export const screenConfig: StackNavigationRoutes<
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
      headerTitle: 'Melding afvalinformatie doen',
    },
  },
  [WasteGuideRouteName.wasteGuideCollectionPoints]: {
    component: CollectionPointsOnMapScreen,
    name: WasteGuideRouteName.wasteGuideCollectionPoints,
    options: {
      headerTitle: 'Afvalpunten op de kaart',
    },
  },
  [WasteGuideRouteName.wasteGuideContainers]: {
    component: ContainersOnMapScreen,
    name: WasteGuideRouteName.wasteGuideContainers,
    options: {
      headerTitle: 'Containers in de buurt',
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

export const wasteGuideModals: StackNavigationRoutes<WasteGuideModalParams> = {}
