import {Advice, BurningGuideCodeVariant} from '@/modules/burning-guide/types'

const adviceVariants = [
  BurningGuideCodeVariant.yellow, // 0
  BurningGuideCodeVariant.orange, // 1
  BurningGuideCodeVariant.red, // 2
]

export const mapAdviceToVariant = (advice: Advice): BurningGuideCodeVariant =>
  adviceVariants[advice] ?? BurningGuideCodeVariant.yellow
