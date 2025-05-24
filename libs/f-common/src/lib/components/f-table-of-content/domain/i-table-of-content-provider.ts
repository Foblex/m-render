import { ITableOfContent } from './i-table-of-content';
import { InjectionToken } from '@angular/core';

export interface ITableOfContentProvider {

  getToC(): ITableOfContent;
}

export const F_TABLE_OF_CONTENT_PROVIDER = new InjectionToken<ITableOfContentProvider>('F_TABLE_OF_CONTENT_PROVIDER');
