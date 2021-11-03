export type Notifications = {
  projectsEnabled?: boolean
  projects: string[]
}

export type RegisterDeviceForPush = {
  device_token: string
  os_type: string
  projects: string[]
}
