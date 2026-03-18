import { defineNavigationGroup, provideFooterNavigation } from '@foblex/m-render';
import { createDocumentationSectionConfiguration } from './documentation-section.factory';

const BASE_RELEASES_CONFIGURATION = createDocumentationSectionConfiguration({
  docsDir: './markdown/releases/',
  withTableOfContent: true,
  navigation: [
    releaseNotes(),
  ],
  meta: {
    title: 'MRender Releases',
    description: 'Release notes, changelogs, and upgrade highlights for MRender.',
    type: 'article',
  },
});

export const RELEASES_CONFIGURATION = {
  providers: [
    ...BASE_RELEASES_CONFIGURATION.providers,
    provideFooterNavigation({
      previous: 'Previous Release',
      next: 'Next Release',
    }),
  ],
};

function releaseNotes() {
  return defineNavigationGroup('Release Notes', [{
    link: 'overview',
    text: 'Overview',
    description: 'Release stream overview and changelog navigation.',
  }, {
    link: 'v4-0-0',
    text: 'v4.0.0',
    description: 'Major visual redesign and UI contract update for consumers using bundled styles.',
    badge: { text: 'latest', type: 'tip' },
  }, {
    link: 'v3-0-0',
    text: 'v3.0.0',
    description: 'Major release notes with layout and SEO enhancements.',
  }, {
    link: 'v2-9-0',
    text: 'v2.9.0',
    description: 'Feature and performance improvements before v3.',
  }]);
}
