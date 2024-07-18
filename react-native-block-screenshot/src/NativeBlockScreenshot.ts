import type { ImageSourcePropType, TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  enableBlockScreenshot(params: {
    backgroundColor: string;
    scale: number;
    source: ImageSourcePropType;
  }): Promise<void>;
  disableBlockScreenshot(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BlockScreenshot');
