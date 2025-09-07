import { IShowcaseItem } from '@foblex/m-render';

export const SHOWCASE: IShowcaseItem[] = [{
  name: 'Showcase 1',
  tags: ['Angular', 'TypeScript', 'Dark Mode', 'Image', 'Light Mode', 'Responsive'],
  description: 'This is the first showcase item with dark image support. The image should change when switching between light and dark mode.',
  imageUrl: 'https://material.angular.dev/assets/img/examples/shiba2.jpg',
  imageUrlDark: 'https://material.angular.dev/assets/img/examples/shiba2-dark.jpg',
  links: [
    { text: 'Website', url: 'https://example.com/view1' },
    { text: 'Demo', url: 'https://example.com/demo1' },
    { text: 'Sources', url:  'https://example.com/demo1' },
  ],
}, {
  name: 'Showcase 2',
  tags: ['Angular', 'TypeScript'],
  description: 'This is the first showcase item without dark image. The image should fallback to the light one.',
  imageUrl: 'https://material.angular.dev/assets/img/examples/shiba2.jpg',
  links: [
    { text: 'Demo', url: 'https://example.com/view1' },
    { text: 'Sources', url: '' },
  ],
}];
