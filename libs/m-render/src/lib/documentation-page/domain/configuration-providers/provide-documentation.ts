import { IDocumentationConfiguration } from '../i-documentation-configuration';
import { InjectionToken } from '@angular/core';

export function provideDocumentation(configuration: IProviderInstance) {
  const merged = Object.assign({}, ...configuration.providers);
  return {
    provide: DOCUMENTATION_CONFIGURATION, useValue: merged,
  };
}

export const DOCUMENTATION_CONFIGURATION = new InjectionToken<IDocumentationConfiguration>('DOCUMENTATION_CONFIGURATION');

interface IProviderInstance {
  providers: Partial<IDocumentationConfiguration>[];
}
