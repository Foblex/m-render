import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { IDocsHeaderNavigationItem } from './i-docs-header-navigation-item';
import { IDocsSocialLink } from './i-docs-social-link';

export const INTERNAL_ENVIRONMENT_SERVICE = new InjectionToken<IEnvironmentService>('INTERNAL_ENVIRONMENT_SERVICE');

export interface IEnvironmentService {

  getLogo(): string;

  getTitle(): string;

  getHeaderNavigation(): IDocsHeaderNavigationItem[];

  getVersion(): Observable<string | undefined>;

  getSocialLinks(): IDocsSocialLink[];
}
