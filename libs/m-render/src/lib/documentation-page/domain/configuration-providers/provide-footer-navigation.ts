import { IDocumentationConfiguration, IMarkdownFooterNavigation } from '../../index';

export function provideFooterNavigation(
  navigation: IMarkdownFooterNavigation,
): Partial<IDocumentationConfiguration> {
  return {
    footer: {
      navigation,
    },
  };
}

