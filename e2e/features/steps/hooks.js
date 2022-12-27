
import { Before, After } from '@cucumber/cucumber';
import { init, cleanup } from 'detox';
import { detox as config } from '../../../package.json';

Before({ timeout: 120 * 1000 }, async () => {
  await init(config);
  await device.launchApp({ newInstance: true });
  //await device.reloadReactNative();
});
After({ timeout: 120 * 1000 }, async () => {
  await cleanup();
});