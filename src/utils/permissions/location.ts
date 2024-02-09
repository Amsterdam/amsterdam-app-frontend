import {
  checkIsPermissionGranted,
  requestIsPermissionGranted,
} from '@/utils/permissions/isPermissionGranted'
import {permissions} from '@/utils/permissions/permissions'

export const locationPermission = permissions.location

export const checkLocationPermissionGranted = () =>
  checkIsPermissionGranted(locationPermission)

export const requestLocationPermissionGranted = () =>
  requestIsPermissionGranted(locationPermission)
