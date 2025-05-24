import { InjectionToken } from '@angular/core';

export interface IToggleNavigationComponent {

  onToggleNavigation(value: boolean): void;
}

export const F_TOGGLE_NAVIGATION_COMPONENT = new InjectionToken<IToggleNavigationComponent>('F_TOGGLE_NAVIGATION_COMPONENT');
