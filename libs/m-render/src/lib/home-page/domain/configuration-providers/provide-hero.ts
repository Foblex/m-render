import { IHomePageConfiguration } from '../i-home-page-configuration';

export function provideHero(hero: IHomePageHero): Partial<IHomePageConfiguration> {
  return {
    hero,
  };
}

export interface IHomePageHero {
  headline?: string;
  tagline1?: string;
  tagline2?: string;
  subDescription?: string;
}
