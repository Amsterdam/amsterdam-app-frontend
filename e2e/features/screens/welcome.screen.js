class WelcomeScreen {
  async tap() {
    await waitFor(element(by.id('WelcomeImageAndQuoteButton')))
      .toBeVisible()
      .withTimeout(10000)
    await element(by.id('WelcomeImageAndQuoteButton')).tap()
  }
}

export default new WelcomeScreen()
