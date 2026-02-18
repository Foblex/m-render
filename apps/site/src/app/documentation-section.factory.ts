import {
  defineLazyComponent,
  provide404Markdown,
  provideComponents,
  provideDirectory,
  provideHeader,
  provideHeaderSearchAlgolia,
  provideHeaderMediaLinks,
  provideHeaderNavigation,
  provideLanguage,
  provideLogo,
  provideMeta,
  provideNavigation,
  provideTableOfContent,
  provideTitle,
} from '@foblex/m-render';

interface IDocumentationSectionOptions {
  docsDir: string;
  title?: string;
  navigation?: Parameters<typeof provideNavigation>;
  withTableOfContent?: boolean;
  withDemoComponents?: boolean;
  meta?: Partial<Parameters<typeof provideMeta>[0]>;
  additionalProviders?: object[];
}

const DEFAULT_META: Parameters<typeof provideMeta>[0] = {
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
};

const DEFAULT_HEADER_NAVIGATION = [
  {
    link: '/docs/what-is-mrender',
    active: '/docs',
    text: 'Docs',
  },
  {
    link: '/showcase/overview',
    active: '/showcase',
    text: 'Showcase',
  },
  {
    link: '/blog/overview',
    active: '/blog',
    text: 'Blog',
  },
  {
    link: '/releases/overview',
    active: '/releases',
    text: 'Releases',
  },
];

const DEFAULT_HEADER_MEDIA_LINKS = [
  { icon: 'github', link: 'https://github.com/Foblex/m-render' },
  { icon: 'twitter', link: 'https://x.com/foblexflow' },
];

export function createDocumentationSectionConfiguration(options: IDocumentationSectionOptions) {
  const {
    docsDir,
    title = 'MRender',
    navigation = [],
    withTableOfContent = true,
    withDemoComponents = false,
    meta,
    additionalProviders = [],
  } = options;

  const providers: object[] = [
    provideLanguage('en'),
    provideDirectory(docsDir),
    provide404Markdown('./markdown/404.md'),
    provideLogo('./logo.svg'),
    provideTitle(title),
    provideNavigation(...navigation),
    provideHeader(
      provideHeaderNavigation(DEFAULT_HEADER_NAVIGATION),
      provideHeaderMediaLinks(DEFAULT_HEADER_MEDIA_LINKS),
    ),
  ];

  if (withDemoComponents) {
    providers.push(
      provideComponents([
        defineLazyComponent('example', () => import('../../../../libs/public/example/example.component')),
        defineLazyComponent('draggable-flow', () => import('../../../../libs/public/draggable-flow/draggable-flow.component')),
      ]),
    );
  }

  if (withTableOfContent) {
    providers.push(provideTableOfContent());
  }

  providers.push(
    provideMeta({
      ...DEFAULT_META,
      ...(meta || {}),
    }),
  );

  if (additionalProviders.length) {
    providers.push(...additionalProviders);
  }

  return { providers };
}
