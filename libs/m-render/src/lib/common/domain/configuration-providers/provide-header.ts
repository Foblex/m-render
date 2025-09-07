import { IHeaderMenuLink, IMediaLink } from '../../../documentation-page';

export function provideHeader(
  ...configuration: Partial<IHeaderConfiguration>[]
): Partial<IHasHeaderConfiguration> {
  return {
    header: Object.assign({}, ...configuration),
  };
}

export interface IHeaderConfiguration {

  search?: boolean;

  navigation?: IHeaderMenuLink[];

  mediaLinks?: IMediaLink[];
}

export interface IHasHeaderConfiguration {

  header?: IHeaderConfiguration;
}
