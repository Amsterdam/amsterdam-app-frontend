import {addons} from '@storybook/manager-api'
import {create} from '@storybook/theming/create'

import './preview.css'

addons.setConfig({
  theme: create({
    appBg: '#ffffff',
    appBorderColor: '#e6e6e6',
    appBorderRadius: 0,
    base: 'light',
    brandImage: './amsterdam.svg',
    brandTitle: 'Gemeente Amsterdam',
    colorPrimary: '#004699',
    colorSecondary: '#009dec',
    fontBase: 'AmsterdamSans-Regular, Arial, sans-serif',
    inputBg: '#ffffff',
    inputBorder: '#767676',
    inputBorderRadius: 0,
    inputTextColor: '#000000',
    textColor: '#000000',
    textInverseColor: '#ffffff',
  }),
})
