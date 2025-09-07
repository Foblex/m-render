import { IHeaderConfiguration } from './provide-header';
import { IHeaderMenuLink } from '../../../documentation-page';

export function provideHeaderNavigation(navigation: IHeaderMenuLink[]): Partial<IHeaderConfiguration> {
  return {
    navigation,
  };
}

