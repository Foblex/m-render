import { InjectionToken } from '@angular/core';
import { IDocsEnvironment } from './i-docs-environment';

export const F_ENVIRONMENT: InjectionToken<IDocsEnvironment>
  = new InjectionToken<IDocsEnvironment>('F_ENVIRONMENT');
