import { InjectionToken } from '@angular/core';
import { IHeaderConfiguration } from './configuration-providers';

export const HEADER_CONFIGURATION_STORE = new InjectionToken<IHeaderConfigurationStore>('HEADER_CONFIGURATION_STORE');

export interface IHeaderConfigurationStore {
  getHeader(): IHeaderConfiguration | undefined;
}
