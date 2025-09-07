import { IHeaderConfiguration } from './provide-header';
import { IMediaLink } from '../../../documentation-page';

export function provideHeaderMediaLinks(mediaLinks: IMediaLink[]): Partial<IHeaderConfiguration> {
  return {
    mediaLinks,
  };
}

