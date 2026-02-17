import { defineNavigationGroup, provideFooterNavigation } from '@foblex/m-render';
import { createDocumentationSectionConfiguration } from './documentation-section.factory';

const BASE_BLOG_CONFIGURATION = createDocumentationSectionConfiguration({
  docsDir: './markdown/blog/',
  withTableOfContent: true,
  navigation: [
    blogPosts(),
  ],
  meta: {
    title: 'MRender Blog',
    description: 'Technical blog about MRender architecture, guides, and implementation details.',
    type: 'article',
  },
});

export const BLOG_CONFIGURATION = {
  providers: [
    ...BASE_BLOG_CONFIGURATION.providers,
    provideFooterNavigation({
      previous: 'Previous Post',
      next: 'Next Post',
    }),
    { blogNavigation: true },
  ],
};

function blogPosts() {
  return defineNavigationGroup('Blog', [{
    link: 'overview',
    text: 'Overview',
    description: 'Blog section index with links to all technical posts.',
  }, {
    link: 'how-we-use-frontmatter',
    text: 'How We Use Frontmatter',
    description: 'A practical post about per-page layout and SEO flags in markdown.',
    pageTitle: 'How We Use Frontmatter in MRender',
  }, {
    link: 'building-example-pages',
    text: 'Building Example Pages',
    description: 'How to structure demo pages for docs, blog, and release sections.',
    pageTitle: 'Building Example Pages',
  }]);
}
