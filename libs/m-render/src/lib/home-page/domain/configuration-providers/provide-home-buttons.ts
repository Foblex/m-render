import { IHomePageConfiguration } from '../i-home-page-configuration';

export function provideHomeButtons(buttons: IHomePageLink[]): Partial<IHomePageConfiguration> {
  return {
    buttons,
  };
}

export interface IHomePageLink {

  primary?: boolean;

  routerLink?: string;

  href?: string;

  text: string;

  icon?: string;
}
