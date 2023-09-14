export type Section = {
  title: string
} & RichText

export type RichText = {
  html: string
  text: string
}
