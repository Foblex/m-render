import {
  defineNavigationGroup,
  provideFooterNavigation,
} from '@foblex/m-render';
import { createDocumentationSectionConfiguration } from './documentation-section.factory';

const BASE_DOCUMENTATION_CONFIGURATION = createDocumentationSectionConfiguration({
  docsDir: './markdown/docs/',
  withDemoComponents: true,
  withTableOfContent: true,
  navigation: [
    introduction(),
    writing(),
    examples(),
  ],
});

export const DOCUMENTATION_CONFIGURATION = {
  providers: [
    ...BASE_DOCUMENTATION_CONFIGURATION.providers,
    provideFooterNavigation({
      editLink: {
        pattern: 'https://github.com/foblex/m-render/edit/main/public/docs/en/',
        text: 'Edit this page on GitHub',
      },
      previous: 'Previous Page',
      next: 'Next Page',
    }),
  ],
};

function introduction() {
  return defineNavigationGroup('Introduction', [{
    link: 'what-is-mrender',
    text: 'What is MRender?',
    description: 'What is MRender? MRender is a powerful library for rendering markdown content in Angular applications. It provides a set of components and services to easily integrate markdown rendering into your projects.',
    image: './images/what-is-preview.png',
    image_width: 3076,
    image_height: 1722,
  }, {
    link: 'getting-started',
    text: 'Getting Started',
    description: 'Getting started with MRender is easy. Follow the steps in this guide to set up MRender in your Angular application and start rendering markdown content.',
    image: './images/get-started-preview.png',
    image_width: 3146,
    image_height: 1736,
  }]);
}

function writing() {
  return defineNavigationGroup('Writing', [{
    link: 'markdown-extensions',
    text: 'Markdown Extensions',
    description: 'Learn about the various markdown extensions supported by MRender. These extensions enhance the functionality of markdown rendering and provide additional features for your content.',
    image: './images/extensions-preview.png',
    image_width: 3188,
    image_height: 1740,
  }]);
}

function examples() {
  return defineNavigationGroup('Examples', [{
    link: 'examples-overview',
    text: 'Examples Overview',
    description: 'Overview page with links and explanation of all examples.',
  }, {
    link: 'example-hide-toc',
    text: 'TOC Disabled',
    description: 'Demonstrates how to disable table of contents for a single markdown page.',
  }, {
    link: 'example-hide-toc-wide-content',
    text: 'TOC Disabled + Wide',
    description: 'Demonstrates wider content layout when table of contents is hidden.',
  }, {
    link: 'example-seo-overrides',
    text: 'SEO Overrides',
    description: 'Demonstrates page-level SEO and social metadata overrides from markdown frontmatter.',
  }, {
    link: 'example-ng-component',
    text: 'ng-component Demo',
    description: 'Demonstrates Angular component preview and URL iframe mode in markdown.',
  }, {
    link: 'example-code-group-alerts',
    text: 'Code Group and Alerts',
    description: 'Demonstrates code tabs, alert containers and grouped preview blocks.',
  }, {
    link: 'example-code-features',
    text: 'Code Features Playground',
    description: 'Comprehensive examples of code rendering features including focus/blur markers and preview modes.',
  }]);
}
