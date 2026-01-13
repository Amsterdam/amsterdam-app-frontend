import {FieldType} from '@/components/ui/forms/input/types'

const PINCODE_MESSAGE = 'Uw pincode mag alleen uit 4 cijfers bestaan.'
const TEL_MESSAGE = 'Dit is geen geldig telefoonnummer.'

export const fieldTypeRules = {
  [FieldType.email]: {
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: 'Dit is geen geldig e-mailadres.',
    },
  },
  [FieldType.numeric]: {
    pattern: {
      value: /^\d+$/,
      message: 'Alleen cijfers zijn toegestaan.',
    },
  },
  [FieldType.tel]: {
    maxLength: {
      value: 16,
      message: TEL_MESSAGE,
    },
    minLength: {
      value: 10,
      message: TEL_MESSAGE,
    },
    pattern: {
      value: /^[0-9+\-()\s]+$/,
      message: TEL_MESSAGE,
    },
  },
  [FieldType.text]: {},
  [FieldType.url]: {
    pattern: {
      value: /^(https?:\/\/|www\.)[^\s]+\.[^\s]+/i,
      message: 'Dit is geen geldig webadres.',
    },
  },
  [FieldType.pin]: {
    minLength: {
      value: 4,
      message: PINCODE_MESSAGE,
    },
    maxLength: {
      value: 4,
      message: PINCODE_MESSAGE,
    },
    pattern: {
      value: /^\d+$/,
      message: PINCODE_MESSAGE,
    },
  },
}

export const fieldTypeToInputMode = {
  [FieldType.email]: 'email',
  [FieldType.numeric]: 'numeric',
  [FieldType.pin]: 'numeric',
  [FieldType.tel]: 'tel',
  [FieldType.text]: 'text',
  [FieldType.url]: 'url',
} as const

export const fieldTypeToKeyboardType = {
  [FieldType.email]: 'email-address',
  [FieldType.numeric]: 'numeric',
  [FieldType.pin]: 'numeric',
  [FieldType.tel]: 'phone-pad',
  [FieldType.text]: 'default',
  [FieldType.url]: 'url',
} as const

export const numericFieldTypes = [FieldType.numeric, FieldType.pin]

export const getTextTransform = (fieldType: FieldType) => {
  if (numericFieldTypes.includes(fieldType)) {
    return (value: string) => value.replace(/\D/g, '')
  }

  if (fieldType === FieldType.tel) {
    return (value: string) => value.replace(/[^0-9+\-()\s]/g, '')
  }

  return undefined
}
