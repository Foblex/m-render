import {
  provideHeader,
  provideHeaderMediaLinks,
  provideHeaderNavigation,
  provideHero,
  provideHomeButtons,
  provideHomeFeatures,
  provideHomeFooter, provideImage,
  provideLogo,
  provideTitle,
} from '@foblex/m-render';
import { HomePageImageComponent } from './home-page-image/home-page-image.component';

export const HOME_CONFIGURATION = {
  providers: [
    provideLogo('./logo.svg'),
    provideTitle('Foblex MRender'),
    provideHero({
      headline: 'Foblex MRender',
      tagline1: 'Built with Angular',
      tagline2: 'Easy Markdown Renderer',
      subDescription: 'Supports SSR, Angular Components, and Dynamic Themes',
    }),
    provideImage(HomePageImageComponent),
    provideHomeButtons([{
      primary: true,
      text: 'What is MRender?',
      routerLink: '/docs/what-is-mrender',
    }, {
      text: 'Get Started',
      routerLink: '/docs/getting-started',
    }, {
      text: 'GitHub',
      href: 'https://github.com/Foblex/m-render',
    }, {
      icon: 'heart',
      text: 'Support Us',
      href: 'https://www.paypal.com/donate/?hosted_button_id=VXXQ5SRMEU256',
    }]),
    provideHomeFeatures([{
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
    }]),
    provideHeader(
      provideHeaderNavigation([
        {
          link: '/introduction/what-is-mrender',
          active: '/introduction',
          text: 'What is MRender?',
        },
        {
          link: '/examples/overview',
          active: '/examples',
          text: 'Examples',
        },
      ]),
      provideHeaderMediaLinks([
        { icon: 'github', link: 'https://github.com/Foblex/m-render' },
        { icon: 'twitter', link: 'https://x.com/foblexflow' },
      ]),
    ),
    provideHomeFooter({
      text: 'MIT License | Copyright © 2022 - Present',
    }),
  ],
};
