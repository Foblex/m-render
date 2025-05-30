import { IDocumentationConfiguration } from '../i-documentation-configuration';
import { INavigationGroup, INavigationItem } from '../../components';

export function provideNavigation(...navigation: INavigationGroup[]): Partial<IDocumentationConfiguration> {
  return {
    navigation,
  };
}

export function defineNavigationGroup(name: string | undefined, items: INavigationItem[]): INavigationGroup {
  return {
    text: name,
    items,
  };
}
