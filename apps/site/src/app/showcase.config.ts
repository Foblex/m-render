import {
  defineNavigationGroup,
  provideShowcase,
} from '@foblex/m-render';
import { SHOWCASE } from '../../public/showcase/showcase';
import { createDocumentationSectionConfiguration } from './documentation-section.factory';

const BASE_SHOWCASE_CONFIGURATION = createDocumentationSectionConfiguration({
  docsDir: './markdown/showcase/',
  withTableOfContent: false,
  navigation: [
    defineNavigationGroup('Showcase', [{
      link: 'overview',
      text: 'Overview',
      description: 'Collection of real projects and integrations built with Foblex libraries.',
    }]),
  ],
});

export const SHOWCASE_CONFIGURATION = {
  providers: [
    ...BASE_SHOWCASE_CONFIGURATION.providers,
    provideShowcase(SHOWCASE),
  ],
};
