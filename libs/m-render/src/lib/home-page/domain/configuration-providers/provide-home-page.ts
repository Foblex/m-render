import { InjectionToken } from '@angular/core';
import { IHomePageConfiguration } from '../i-home-page-configuration';

export function provideHomePage(configuration: IProviderInstance) {
  const merged = Object.assign({}, ...configuration.providers);
  return [{
    provide: HOME_PAGE_CONFIGURATION, useValue: merged,
  }];
}

export const HOME_PAGE_CONFIGURATION = new InjectionToken<IHomePageConfiguration>('HOME_PAGE_CONFIGURATION');

interface IProviderInstance {
  providers: Partial<IHomePageConfiguration>[];
}
