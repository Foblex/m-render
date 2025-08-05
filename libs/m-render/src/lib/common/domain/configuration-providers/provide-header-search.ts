import { IHeaderConfiguration } from './provide-header';

export function provideHeaderSearch(search?: boolean): Partial<IHeaderConfiguration> {
  return {
    search,
  };
}
