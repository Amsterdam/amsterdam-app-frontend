class WelcomeScreen {
  async tapWelcomeScreen() {
    await waitFor(element(by.id('WelcomePressableImageAndQuote')))
      .toBeVisible()
      .withTimeout(10000)
    await element(by.id('WelcomePressableImageAndQuote')).tap()
  }
}
export default new WelcomeScreen()
