import { IHeaderMenuLink, ISocialLink } from '../../components';

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

  mediaLinks?: ISocialLink[];
}

export interface IHasHeaderConfiguration {

  header?: IHeaderConfiguration;
}
