import { IHeaderConfiguration, IHeaderSearchConfiguration } from './provide-header';

export function provideHeaderSearchAlgolia(configuration: IHeaderSearchConfiguration): Partial<IHeaderConfiguration> {
  return {
    search: true,
    searchConfiguration: configuration,
  };
}
