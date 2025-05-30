import { IHomePageConfiguration } from '../i-home-page-configuration';

export function provideHomeFooter(footer: IHomePageFooter): Partial<IHomePageConfiguration> {
  return {
    footer,
  };
}

export interface IHomePageFooter {

  text: string;
}
