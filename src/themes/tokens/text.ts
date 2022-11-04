export type ParagraphVariants = 'body' | 'intro' | 'quote' | 'small'

type FormTextTokens = {
  input: number
}

type ParagraphTokens = {
  body: number
  intro: number
  quote: number
  small: number
}

export type TitleTokensPerLevel = {
  h1: number
  h2: number
  h3: number
  h4: number
  h5: number
  h6: number
}

export enum FontWeight {
  bold = 'AmsterdamSans-ExtraBold',
  normal = 'AmsterdamSans-Regular',
}

export type TextTokens = {
  fontSize: ParagraphTokens & TitleTokensPerLevel
  fontWeight: typeof FontWeight
  lineHeight: FormTextTokens & ParagraphTokens & TitleTokensPerLevel
}

export const textTokens: TextTokens = {
  fontSize: {
    body: 18,
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 22,
    h5: 18,
    h6: 16,
    intro: 22,
    quote: 24,
    small: 16,
  },
  fontWeight: {
    bold: FontWeight.bold,
    normal: FontWeight.normal,
  },
  lineHeight: {
    input: 1.4,
    body: 1.6,
    h1: 1.1,
    h2: 1.2,
    h3: 1.3,
    h4: 1.4,
    h5: 1.4,
    h6: 1.4,
    intro: 1.6,
    quote: 1.3,
    small: 1.5,
  },
}
