import {
  defineLazyComponent,
  defineNavigationGroup,
  provide404Markdown,
  provideComponents,
  provideDirectory,
  provideDocumentationMeta,
  provideFooterNavigation,
  provideHeader,
  provideHeaderMediaLinks,
  provideLanguage,
  provideLogo,
  provideNavigation,
  provideTitle,
  provideTocData,
} from '@foblex/m-render';

export const DOCUMENTATION_CONFIGURATION = {
  providers: [
    provideLanguage('en'),
    provideDirectory('./markdown/docs/'),
    provide404Markdown('./markdown/404.md'),
    provideLogo('./logo.svg'),
    provideTitle('MRender'),
    provideNavigation(
      introduction(),
      writing(),
    ),
    provideComponents([
      defineLazyComponent('example', () => import('../../../../libs/public/example/example.component')),
      defineLazyComponent('draggable-flow', () => import('../../../../libs/public/draggable-flow/draggable-flow.component')),
    ]),
    provideTocData({
      title: 'In this article',
      range: { start: 2, end: 6 },
    }),
    provideHeader(
      // provideHeaderNavigation([{
      //   link: '/docs/what-is-mrender',
      //   active: '/docs/what-is-mrender',
      //   text: 'What is MRender?',
      // }, {
      //   link: '/docs/getting-started',
      //   active: '/docs/getting-started',
      //   text: 'Examples',
      // }]),
      provideHeaderMediaLinks([
        { icon: 'github', link: 'https://github.com/Foblex/m-render' },
        { icon: 'twitter', link: 'https://x.com/foblexflow' },
      ]),
    ),
    provideFooterNavigation({
      editLink: {
        pattern: 'https://github.com/foblex/m-render/edit/main/public/docs/en/',
        text: 'Edit this page on GitHub',
      },
      previous: 'Previous Page',
      next: 'Next Page',
    }),
    provideDocumentationMeta({
      url: 'https://m-render.foblex.com',
      type: 'website',
      title: 'Angular Library for rendering Markdown files - Foblex MRender',
      app_name: 'Foblex MRender',
      locale: 'en',
      description: 'Foblex MRender is an Angular library for rendering Markdown files by extending their functionality with support for Angular components and code snippets.',
      image: 'https://m-render.foblex.com/site-preview.png',
      image_type: 'image/png',
      image_width: 2986,
      image_height: 1926,
    }),
  ],
};

function introduction() {
  return defineNavigationGroup('Introduction', [{
    link: 'what-is-mrender',
    text: 'What is MRender?',
    description: 'What is MRender? MRender is a powerful library for rendering markdown content in Angular applications. It provides a set of components and services to easily integrate markdown rendering into your projects.',
  }, {
    link: 'getting-started',
    text: 'Getting Started',
    description: 'Getting started with MRender is easy. Follow the steps in this guide to set up MRender in your Angular application and start rendering markdown content.',
  }]);
}

function writing() {
  return defineNavigationGroup('Writing', [{
    link: 'markdown-extensions',
    text: 'Markdown Extensions',
    description: 'Learn about the various markdown extensions supported by MRender. These extensions enhance the functionality of markdown rendering and provide additional features for your content.',
  }]);
}
