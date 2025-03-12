import {ConversationEntrySenderRole} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {baseColor} from '@/themes/tokens/base-color'

export type ColorTokens = typeof lightColorTokens

/**
 * The light color theme, the keys of the object should not contain any color name at all
 */
export const lightColorTokens = {
  accessToken: {
    digit: {
      background: baseColor.primary.white,
      border: baseColor.primary.black,
    },
  },
  alert: {
    information: {
      border: baseColor.primary.blue,
      background: baseColor.primary.white,
    },
    negative: {
      border: baseColor.primary.red,
      background: baseColor.primary.white,
    },
    positive: {
      border: baseColor.secondary.darkgreen,
      background: baseColor.primary.white,
    },
    warning: {
      border: baseColor.secondary.orange,
      background: baseColor.primary.white,
    },
  },
  appSwitcher: {
    background: baseColor.primary.red,
  },
  articleOverview: {
    year: {
      background: baseColor.primary.white,
    },
  },
  attention: {
    default: {
      border: baseColor.primary.blue,
    },
    warning: {
      border: baseColor.primary.red,
    },
  },
  backgroundArea: {
    primary: baseColor.primary.blue,
  },
  badge: {
    background: {
      info: baseColor.primary.blue,
      warning: baseColor.primary.red,
    },
    border: baseColor.primary.white,
  },
  barcode: {
    background: baseColor.primary.white,
    foreground: baseColor.primary.black,
  },
  /**
   * @deprecated no generic border property
   */
  border: {
    default: baseColor.neutral.grey1,
    onGrey: baseColor.neutral.grey2,
    cityPass: baseColor.secondary.purple,
  },
  bottomSheet: {
    background: baseColor.primary.white,
  },
  box: {
    background: {
      distinct: baseColor.primary.white,
      cityPass: baseColor.secondary.purple,
    },
    border: {
      default: baseColor.neutral.grey1,
      distinct: baseColor.primary.blue,
      onGrey: baseColor.neutral.grey2,
      cityPass: baseColor.secondary.purple,
    },
  },
  card: {
    pressed: {
      background: baseColor.neutral.grey1,
    },
  },
  chat: {
    avatar: {
      foreground: baseColor.primary.black,
      background: baseColor.primary.white,
      border: baseColor.neutral.grey2,
    },
    border: baseColor.transparent.blue25,
    loading: {
      active: baseColor.neutral.grey4,
      inactive: baseColor.neutral.grey2,
    },
    maximized: {
      background: baseColor.primary.white,
    },
    minimized: {
      background: baseColor.custom.grey0,
    },
    message: {
      [ConversationEntrySenderRole.chatbot]: {
        background: baseColor.neutral.grey1,
      },
      [ConversationEntrySenderRole.agent]: {
        background: baseColor.neutral.grey1,
      },
      [ConversationEntrySenderRole.user]: {
        background: baseColor.neutral.grey4,
      },
      [ConversationEntrySenderRole.system]: {
        background: baseColor.neutral.grey1,
      },
    },
    attachment: {
      background: baseColor.custom.grey0,
    },
    attachmentButtonCircle: {
      background: baseColor.primary.white,
    },
  },
  checkbox: {
    underlay: baseColor.primary.white,
  },
  cityPass: {
    overlay: baseColor.transparent.black90,
    passHeader: baseColor.neutral.grey1,
    passInner: baseColor.primary.white,
    passBackground: baseColor.primary.white,
    card: {
      border: baseColor.neutral.grey2,
    },
  },
  customKeyboard: {
    background: baseColor.neutral.grey2,
    button: {
      background: baseColor.primary.white,
      pressed: {
        background: baseColor.neutral.grey1,
      },
      shadow: baseColor.primary.black,
    },
  },
  control: {
    default: {
      background: baseColor.primary.white,
      border: baseColor.neutral.grey3,
    },
    checked: {
      background: baseColor.primary.blue,
      border: baseColor.primary.blue,
    },
    focus: {
      border: baseColor.primary.black,
    },
    warning: {
      border: baseColor.primary.red,
    },
  },
  imageFallback: {
    background: baseColor.primary.white,
    border: baseColor.primary.blue,
  },
  logo: baseColor.primary.red,
  noInternet: {
    background: baseColor.primary.red,
  },
  notificationHistory: {
    itemIcon: {
      background: baseColor.primary.blue,
    },
  },
  pagination: {
    background: baseColor.primary.blue,
    container: {
      background: baseColor.transparent.grey50,
    },
    item: {
      active: baseColor.primary.white,
      inactive: baseColor.transparent.white30,
    },
  },
  pressable: {
    primary: {
      default: {
        background: baseColor.primary.blue,
        border: baseColor.transparent.full,
        label: baseColor.primary.white,
      },
      pressed: {
        background: baseColor.secondary.darkblue,
        border: baseColor.transparent.full,
        label: baseColor.primary.white,
      },
    },
    secondary: {
      default: {
        background: baseColor.primary.white,
        border: baseColor.primary.blue,
        icon: baseColor.primary.blue,
        label: baseColor.primary.blue,
      },
      pressed: {
        background: baseColor.primary.white,
        border: baseColor.secondary.darkblue,
        label: baseColor.secondary.darkblue,
      },
    },
    tertiary: {
      default: {
        background: baseColor.primary.white,
        border: baseColor.transparent.full,
        label: baseColor.primary.blue,
      },
      pressed: {
        background: baseColor.neutral.grey1,
        border: baseColor.primary.blue,
        label: baseColor.secondary.darkblue,
      },
    },
    transparent: {
      default: {
        background: baseColor.transparent.full,
        border: baseColor.transparent.full,
        label: baseColor.primary.blue,
      },
      pressed: {
        background: baseColor.primary.white,
        border: baseColor.neutral.grey1,
        label: baseColor.secondary.darkblue,
      },
    },
  },
  screen: {
    background: {
      default: baseColor.primary.white,
      settings: baseColor.custom.grey0,
    },
  },
  shadow: {
    default: baseColor.primary.black,
  },
  skeleton: {
    background: baseColor.neutral.grey2,
    highlight: baseColor.transparent.white30,
  },
  swipeToDelete: {
    background: baseColor.primary.red,
  },
  switch: {
    thumb: {
      disabled: {
        background: baseColor.neutral.grey2,
      },
      enabled: {
        background: baseColor.primary.white,
      },
    },
    track: {
      off: {
        background: baseColor.neutral.grey3,
      },
      on: {
        background: baseColor.primary.blue,
      },
    },
  },
  tag: {
    background: baseColor.secondary.yellow,
  },
  text: {
    cityPass: baseColor.secondary.purple,
    confirm: baseColor.secondary.darkgreen,
    default: baseColor.primary.black,
    inverse: baseColor.primary.white,
    link: baseColor.primary.blue,
    secondary: baseColor.neutral.grey3,
    tertiary: baseColor.neutral.grey2,
    warning: baseColor.primary.red,
  },
  textInput: {
    container: {
      background: baseColor.primary.white,
    },
  },
  progressSteps: {
    primary: {
      connector: {
        current: baseColor.primary.blue,
        done: baseColor.primary.blue,
        upcoming: baseColor.neutral.grey3,
      },
      indicator: {
        current: {
          background: baseColor.primary.blue,
        },
        done: {
          background: baseColor.primary.blue,
        },
        upcoming: {
          background: baseColor.neutral.grey3,
        },
      },
    },
    secondary: {
      connector: {
        current: baseColor.primary.black,
        done: baseColor.secondary.darkgreen,
        upcoming: baseColor.neutral.grey3,
      },
      indicator: {
        current: {
          background: baseColor.primary.black,
          border: baseColor.primary.black,
          label: baseColor.primary.white,
        },
        done: {
          background: baseColor.secondary.darkgreen,
          border: baseColor.secondary.darkgreen,
        },
        upcoming: {
          background: baseColor.primary.white,
          border: baseColor.neutral.grey3,
          label: baseColor.neutral.grey3,
        },
      },
    },
  },
  tooltip: {
    background: baseColor.neutral.grey4,
  },
}
