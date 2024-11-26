/* eslint-disable @typescript-eslint/no-empty-function */
export default {
  displayNotification: () => {},
  createChannel: () => {},
  onForegroundEvent: () => () => {},
}

export enum EventType {
  UNKNOWN = -1,
  DISMISSED = 0,
  PRESS = 1,
  ACTION_PRESS = 2,
  DELIVERED = 3,
  APP_BLOCKED = 4,
  CHANNEL_BLOCKED = 5,
  CHANNEL_GROUP_BLOCKED = 6,
  TRIGGER_NOTIFICATION_CREATED = 7,
  FG_ALREADY_EXIST = 8,
}
