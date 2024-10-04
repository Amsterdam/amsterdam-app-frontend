export const zTokens = {
  articlePreviewLine: -1,
  carouselSlideBackgroundImageContainer: -1,
  timelineLine: -1,
  articleOverviewYear: 1,
  carouselSlideContent: 1,
  overlay: 3,
  productTourTooltipWrapperParent: 1, // this should be lower than the value for `tooltip`, set this on a view higher in the component tree to prevent z index issues
  tooltip: 2,
  appSwitcher: 10,
}

export type ZTokens = typeof zTokens
