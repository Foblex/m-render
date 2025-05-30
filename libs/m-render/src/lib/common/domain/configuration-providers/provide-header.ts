import { IHeaderMenuLink, ISocialLink } from '../../components';
import { InjectionToken } from '@angular/core';

export function provideHeader(
  ...configuration: Partial<IHeaderConfiguration>[]
): Partial<IHasHeaderConfiguration> {
  return {
    header: Object.assign({}, ...configuration),
  };
}

export interface IHeaderConfiguration {

  navigation?: IHeaderMenuLink[];

  mediaLinks?: ISocialLink[];
}

export interface IHasHeaderConfiguration {
  header?: IHeaderConfiguration;
}

export const HEADER_CONFIGURATION = new InjectionToken<IHasHeaderConfiguration>('HEADER_CONFIGURATION');
