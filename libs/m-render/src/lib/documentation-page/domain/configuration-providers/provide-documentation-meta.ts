import { IMetaData } from '../../analytics';
import { IDocumentationConfiguration } from '../i-documentation-configuration';

export function provideDocumentationMeta(meta: IMetaData): Partial<IDocumentationConfiguration> {
  return {
    meta,
  };
}
