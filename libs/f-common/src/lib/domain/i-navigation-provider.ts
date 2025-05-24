import { InjectionToken } from '@angular/core';
import { INavigationGroup } from '../components';
import { IDocsHeaderNavigationItem } from './i-docs-header-navigation-item';

export interface INavigationProvider {

  getTitle(): string;

  getLogo(): string;

  getNavigation(): INavigationGroup[];

  getHeaderNavigation(): IDocsHeaderNavigationItem[];
}

export const F_NAVIGATION_PROVIDER = new InjectionToken<INavigationProvider>('F_NAVIGATION_PROVIDER');
