import { expect } from 'detox';
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('e2e/features/poc.feature');

const welkomstPage = require('../pageobjects/welkomst.page');
const NavPage = require('../pageobjects/nav.page')

defineFeature(feature, (test) => {
    

    // beforeEach(async () => {
    //     await device.launchApp({ newInstance: true });
    //   });

    test('De contactpagina openen', ({ given, when, then }) => {
      given('ik ben op de navigatiepagina', async () => {
        await device.launchApp({ newInstance: true });
        
      });
  
      when('ik open de contact pagina', async () => {
        await waitFor(element(by.text('Contact'))).toBeVisible().withTimeout(10000);
        await element(by.text('Contact')).tap();
      });
  
      then('de contact pagina opent', async () => {
        await waitFor(element(by.text('Kunnen we u helpen?'))).toBeVisible().withTimeout(5000);
        //await waitFor(element(by.text('Kunnen we u helpen?'))).toBeVisible().whileElement(by.text('Bekijk route')).scroll(100, 'down');
       //await element(by.text('Amstel 1')).scrollTo('bottom');
        await element(by.id('bezoek')).swipe('up');
        await element(by.text('Amstel 1')).tap();

      });
    });

    test('Contactgegevens opzoeken van het stadsloket waar ik als Amsterdammer naar toe wil', ({ given, when, then }) => {
      given('ik ben op de contactpagina', async () => {
        await device.launchApp({ newInstance: true });
        await waitFor(element(by.text('Contact'))).toBeVisible().withTimeout(10000);
        await element(by.text('Contact')).tap();
      });
  
      when('ik verander het stadsloket naar stadsloket Nieuw-West', async () => {
        await waitFor(element(by.text('Kunnen we u helpen?'))).toBeVisible().withTimeout(5000);
        //await waitFor(element(by.text('Kunnen we u helpen?'))).toBeVisible().whileElement(by.text('Bekijk route')).scroll(100, 'down');
       //await element(by.text('Amstel 1')).scrollTo('bottom');
        await element(by.id('bezoek')).swipe('up');
        await element(by.text('Amstel 1')).tap();
        await element(by.text('Stadsloket Nieuw-West')).tap();
        await expect(element(by.text('Stadsloket Nieuw-West'))).toBeVisible()
      });
  
      then('ik zie contactgegevens en informatie van het betreffende stadsloket', async () => {
        await waitFor(element(by.text('Osdorpplein 946'))).toBeVisible().withTimeout(3000);
        await waitFor(element(by.text('Tijdelijk alleen open voor ophalen'))).toBeVisible().withTimeout(3000);
      });
    });

  });