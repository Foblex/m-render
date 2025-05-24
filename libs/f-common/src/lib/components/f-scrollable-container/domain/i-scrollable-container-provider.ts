import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TableOfContentData } from '../../f-table-of-content';

export interface IScrollableContainerProvider {

  onToc$: Observable<TableOfContentData>;

  scrollTo(hash: string): void;

  setOnPageNavigation(element: HTMLElement): void;
}

export const F_SCROLLABLE_CONTAINER = new InjectionToken<IScrollableContainerProvider>('F_SCROLLABLE_CONTAINER');
