import {
  type BottomSheetHandleProps,
  BottomSheetHandle,
} from '@gorhom/bottom-sheet'

export const Handle = (props: BottomSheetHandleProps) => (
  <BottomSheetHandle
    accessibilityHint="Veeg omlaag om te sluiten"
    accessibilityLabel="Sluiten"
    {...props}
  />
)
