import {
  provide404Markdown,
  provideDirectory,
  provideMeta,
  provideHeader,
  provideHeaderMediaLinks, provideHeaderNavigation,
  provideLanguage,
  provideLogo,
  provideTitle, provideNavigation, provideShowcase,
} from '@foblex/m-render';
import { SHOWCASE } from '../../public/showcase/showcase';

export const SHOWCASE_CONFIGURATION = {
  providers: [
    provideLanguage('en'),
    provideDirectory('./markdown/showcase/'),
    provide404Markdown('./markdown/404.md'),
    provideLogo('./logo.svg'),
    provideTitle('MRender'),
    provideNavigation(),
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
    provideShowcase(SHOWCASE),
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
