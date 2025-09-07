import { IMetaData } from '../../analytics';
import { IDocumentationConfiguration } from '../i-documentation-configuration';

export function provideMeta(meta: IMetaData): Partial<IDocumentationConfiguration> {
  return {
    meta,
  };
}
