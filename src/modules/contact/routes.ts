export enum ContactRouteName {
  contact = 'Contact',
}

export type ContactStackParams = {
  [ContactRouteName.contact]: undefined
}

export enum ContactModalName {}

export type ContactModalParams = Record<string, never>
