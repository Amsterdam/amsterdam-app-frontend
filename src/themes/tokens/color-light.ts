import {baseColor} from '@/themes/tokens/base-color'

export type ColorTokens = typeof lightColorTokens

/**
 * The light color theme, the keys of the object should not contain any color name at all
 */
export const lightColorTokens = {
  /**
   * @deprecated no generic background property
   */
  background: {
    cutout: baseColor.primary.white,
    inactive: baseColor.neutral.grey4,
    inverse: baseColor.neutral.grey5,
    alert: baseColor.secondary.yellow,
    /**
     * @deprecated
     */
    white: baseColor.primary.white,
  },
  swipeToDelete: {
    background: baseColor.support.invalid,
  },
  noInternet: {
    background: baseColor.primary.red,
  },
  box: {
    distinct: baseColor.primary.white,
    cityPass: baseColor.custom.purple1,
  },
  timeline: {
    future: baseColor.neutral.grey4,
    past: baseColor.primary.blue,
  },
  appSwitcher: {
    background: baseColor.primary.red,
  },
  /**
   * @deprecated no generic border property
   */
  border: {
    default: baseColor.neutral.grey2,
    onGrey: baseColor.neutral.grey3,
    primary: baseColor.primary.blue,
    cityPass: baseColor.custom.purple1,
    positive: baseColor.support.valid,
    negative: baseColor.support.invalid,
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
  },
  control: {
    default: {
      background: baseColor.primary.white,
      border: baseColor.neutral.grey4,
    },
    checked: {
      background: baseColor.primary.blue,
      border: baseColor.primary.blue,
    },
    focus: {
      border: baseColor.primary.black,
    },
    warning: {
      border: baseColor.support.invalid,
    },
  },
  checkbox: {
    underlay: baseColor.primary.white,
  },
  switch: {
    thumb: {
      disabled: {
        background: baseColor.neutral.grey3,
      },
      enabled: {
        background: baseColor.primary.white,
      },
    },
    track: {
      off: {
        background: baseColor.neutral.grey4,
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
        background: baseColor.functional.darkblue,
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
        border: baseColor.functional.darkblue,
        label: baseColor.functional.darkblue,
      },
    },
    tertiary: {
      default: {
        background: baseColor.primary.white,
        border: baseColor.transparent.full,
        label: baseColor.primary.blue,
      },
      pressed: {
        background: baseColor.custom.grey1,
        border: baseColor.primary.blue,
        label: baseColor.functional.darkblue,
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
        border: baseColor.custom.grey1,
        label: baseColor.functional.darkblue,
      },
    },
  },
  card: {
    pressed: {
      background: baseColor.custom.grey1,
    },
  },
  screen: {
    background: {
      default: baseColor.primary.white,
      settings: baseColor.custom.grey1,
    },
  },
  alert: {
    information: {
      border: baseColor.primary.blue,
      background: baseColor.primary.white,
    },
    negative: {
      border: baseColor.support.invalid,
      background: baseColor.primary.white,
    },
    positive: {
      border: baseColor.support.valid,
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
    cityPass: baseColor.custom.purple1,
    confirm: baseColor.support.valid,
    default: baseColor.primary.black,
    inverse: baseColor.primary.white,
    link: baseColor.primary.blue,
    secondary: baseColor.neutral.grey4,
    tertiary: baseColor.neutral.grey3,
    warning: baseColor.support.invalid,
  },
  skeleton: {
    background: baseColor.neutral.grey3,
    highlight: baseColor.transparent.white30,
  },
}
