export const config = {
  /**
   * The width of the marker box in a list item.
   * Derived from the design system, where the width is 40px for 24px text.
   * Our value is 30 because our base font size is 18px, and 18/24 × 40 = 30.
   * When implementing, remember to multiply with `DeviceContext.fontScale`.
   */
  listItemMarkerBoxWidth: 30,
  /**
   * The minimum width and height of a touch target.
   * Derived from Apple’s Human Interface Guidelines (44px) and Android’s Material Design (48px).
   */
  minTouchSize: 48,
}
