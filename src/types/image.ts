export type Image = {
  sources: ImageSources
  type: string
}

export type ImageSources = {
  orig: ImageSource
  '220px': ImageSource
  '460px': ImageSource
  '700px': ImageSource
  '80px': ImageSource
}

export type ImageSource = {
  description: string
  filename: string
  image_id: string
  size?: string
  url: string
}
