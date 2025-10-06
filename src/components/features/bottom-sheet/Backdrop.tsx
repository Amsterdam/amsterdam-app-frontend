import {
  type BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'

export const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    accessibilityHint="Dubbeltik om te sluiten"
    accessibilityLabel="Sluiten"
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    {...props}
  />
)
