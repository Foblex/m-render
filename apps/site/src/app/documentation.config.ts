import {
  defineLazyComponent,
  defineNavigationGroup,
  provide404Markdown,
  provideComponents,
  provideDirectory,
  provideMeta,
  provideFooterNavigation,
  provideHeader,
  provideHeaderMediaLinks,
  provideLanguage,
  provideLogo,
  provideNavigation,
  provideTitle,
  provideTableOfContent, provideHeaderNavigation,
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
    provideHeader(
      provideHeaderNavigation([{
        link: '/docs/what-is-mrender',
        active: '/docs',
        text: 'What is MRender?',
      }, {
        link: '/showcase/overview',
        active: '/showcase',
        text: 'Showcase',
      }]),
      provideHeaderMediaLinks([
        { icon: 'github', link: 'https://github.com/Foblex/m-render' },
        { icon: 'twitter', link: 'https://x.com/foblexflow' },
      ]),
    ),
    provideComponents([
      defineLazyComponent('example', () => import('../../../../libs/public/example/example.component')),
      defineLazyComponent('draggable-flow', () => import('../../../../libs/public/draggable-flow/draggable-flow.component')),
    ]),
    provideTableOfContent(),
    provideFooterNavigation({
      editLink: {
        pattern: 'https://github.com/foblex/m-render/edit/main/public/docs/en/',
        text: 'Edit this page on GitHub',
      },
      previous: 'Previous Page',
      next: 'Next Page',
    }),
    provideMeta({
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
