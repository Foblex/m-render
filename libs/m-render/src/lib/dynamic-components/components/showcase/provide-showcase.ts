import { IDocumentationConfiguration } from '../../../documentation-page';
import { IShowcaseItem } from './models';

export function provideShowcase(showcaseItems: IShowcaseItem[]): Partial<IDocumentationConfiguration> {
  return {
    showcaseItems,
  };
}

