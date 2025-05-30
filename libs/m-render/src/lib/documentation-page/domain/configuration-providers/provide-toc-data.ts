import { ITableOfContent } from '../../components';
import { IDocumentationConfiguration } from '../i-documentation-configuration';

export function provideTocData(toC: ITableOfContent): Partial<IDocumentationConfiguration> {
  return {
    toC,
  };
}
