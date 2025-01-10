import { IHomePageEnvironment } from '@foblex/m-render';

export const HOME_ENVIRONMENT: IHomePageEnvironment = {
  logo: './logo.svg',
  title: 'Foblex MRender',
  hero: {
    headline: 'Foblex MRender',
    tagline1: 'Built with Angular',
    tagline2: 'Easy Markdown Renderer',
    subDescription: 'Supports SSR, Angular Components, and Dynamic Themes',
  },
  // buttons: [{
  //   primary: true,
  //   text: 'What is MRender?',
  //   routerLink: '/docs/what-is-m-render',
  // }, {
  //   text: 'Get Started',
  //   routerLink: '/docs/get-started',
  // }, {
  //   text: 'GitHub',
  //   href: 'https://github.com/Foblex/m-render',
  // }],
  buttons: [],
  features: [{
    headline: 'Easy to Use',
    description: 'Provide a simple configuration, and the library renders your Markdown documents instantly. Specify basic parameters like language, navigation, and document directory.',
  }, {
    headline: 'Customizable',
    description: 'Adapt the library to suit your project. Configure logos, headers, navigation, and components, ensuring every aspect aligns with your specific requirements.',
  }, {
    headline: 'Visualization',
    description: 'Convert Markdown files into complete pages with Angular component support. Perfect for building documentation, guides, or content-focused projects.',
  }, {
    headline: 'Advanced Features',
    description: 'Enhance your documents with Angular components. Embed custom elements directly into the text for an intuitive representation of complex information.',
  }],
  footer: {
    text: 'MIT License | Copyright © 2022 - Present',
  }
}
