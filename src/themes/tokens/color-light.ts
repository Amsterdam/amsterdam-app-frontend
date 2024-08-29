import {baseColor} from '@/themes/tokens/base-color'

export type ColorTokens = typeof lightColorTokens

/**
 * The light color theme, the keys of the object should not contain any color name at all
 */
export const lightColorTokens = {
  swipeToDelete: {
    background: baseColor.primary.red,
  },
  noInternet: {
    background: baseColor.primary.red,
  },
  box: {
    distinct: baseColor.primary.white,
    cityPass: baseColor.secondary.purple,
  },
  timeline: {
    future: baseColor.neutral.grey3,
    past: baseColor.primary.blue,
  },
  appSwitcher: {
    background: baseColor.primary.red,
  },
  /**
   * @deprecated no generic border property
   */
  border: {
    default: baseColor.neutral.grey1,
    onGrey: baseColor.neutral.grey2,
    cityPass: baseColor.secondary.purple,
  },
  attention: {
    default: {
      border: baseColor.primary.blue,
    },
    warning: {
      border: baseColor.primary.red,
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
  cityPass: {
    overlay: baseColor.transparent.black90,
    passHeader: baseColor.neutral.grey1,
    passInner: baseColor.primary.white,
    passBackground: baseColor.primary.white,
    card: {
      border: baseColor.neutral.grey2,
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
  textInput: {
    container: {
      background: baseColor.primary.white,
    },
  },
  checkbox: {
    underlay: baseColor.primary.white,
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
  badge: {
    background: baseColor.primary.red,
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
  card: {
    pressed: {
      background: baseColor.neutral.grey1,
    },
  },
  screen: {
    background: {
      default: baseColor.primary.white,
      settings: baseColor.custom.grey0,
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
  shadow: {
    default: baseColor.primary.black,
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
  skeleton: {
    background: baseColor.neutral.grey2,
    highlight: baseColor.transparent.white30,
  },
  tag: {
    background: baseColor.secondary.yellow,
  },
  tooltip: {
    background: baseColor.neutral.grey4,
  },
  barcode: {
    background: baseColor.primary.white,
    foreground: baseColor.primary.black,
  },
  imageFallback: {
    background: baseColor.primary.white,
    border: baseColor.primary.blue,
  },
  articleOverview: {
    year: {
      background: baseColor.primary.white,
    },
  },
}
