import { IHeaderConfiguration } from './provide-header';
import { ISocialLink } from '../../components';

export function provideHeaderMediaLinks(mediaLinks: ISocialLink[]): Partial<IHeaderConfiguration> {
  return {
    mediaLinks,
  };
}

