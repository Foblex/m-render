import { InjectionToken } from '@angular/core';
import { INpmVersion } from './i-npm-version';

export interface INpmVersionProvider {

  getNpmVersion(): INpmVersion | undefined;
}

export const F_NPM_VERSION_PROVIDER = new InjectionToken<INpmVersionProvider>('F_NPM_VERSION_PROVIDER');
