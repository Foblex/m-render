import { IHeaderConfiguration } from './provide-header';
import { IHeaderMenuLink } from '../../components';

export function provideHeaderNavigation(navigation: IHeaderMenuLink[]): Partial<IHeaderConfiguration> {
  return {
    navigation,
  };
}

