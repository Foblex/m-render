import { IDocsEnvironment, INavigationGroup } from '@f-common';
import { lazyComponent } from '@f-markdown';

export const DOCUMENTATION_ENVIRONMENT: IDocsEnvironment = createEnvironment();

function createEnvironment(): IDocsEnvironment {
  return {
    lang: 'en',
    docsDir: './markdown/docs/',
    notFoundMD: './markdown/404.md',
    logo: './logo.svg',
    title: 'MRender',
    navigation: [
      introduction(),
      writing(),
    ],
    footerNavigation: {
      editLink: {
        pattern: 'https://github.com/foblex/m-render/edit/main/public/docs/en/',
        text: 'Edit this page on GitHub',
      },
      previous: 'Previous Page',
      next: 'Next Page',
    },
    components: [
      {
        tag: 'example',
        component: lazyComponent(() => import('../../../../../libs/public/example/example.component')),
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Foblex/m-render' },
      { icon: 'twitter', link: 'https://x.com/foblexflow' },
    ],
    toC: {
      title: 'In this article',
      range: { start: 2, end: 6 },
    },
  }
}

function introduction(): INavigationGroup {
  return {
    text: 'Introduction',
    items: [
      {
        link: 'what-is-mrender',
        text: 'What is MRender?',
        description: 'What is MRender? MRender is a powerful library for rendering markdown content in Angular applications. It provides a set of components and services to easily integrate markdown rendering into your projects.',
      },
      {
        link: 'getting-started',
        text: 'Getting Started',
        description: 'Getting started with MRender is easy. Follow the steps in this guide to set up MRender in your Angular application and start rendering markdown content.',
      },
    ],
  }
}
function writing(): INavigationGroup {
  return {
    text: 'Writing',
    items: [
      {
        link: 'markdown-extensions',
        text: 'Markdown Extensions',
        description: 'Learn about the various markdown extensions supported by MRender. These extensions enhance the functionality of markdown rendering and provide additional features for your content.',
      },
    ],
  }
}
