declare module '*.svg' {
  const content: any
  export default content // eslint-disable-line import/no-default-export
}

declare module '@env' {
  export const AUTH_TOKEN: string
  export const PROJECT_MANAGER_TOKEN: string
  export const VERSION: string
  export const BUILD_NUMBER: string
}
