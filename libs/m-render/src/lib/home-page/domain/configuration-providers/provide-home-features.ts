import { IHomePageConfiguration } from '../i-home-page-configuration';

export function provideHomeFeatures(features: IHomePageFeature[]): Partial<IHomePageConfiguration> {
  return {
    features,
  };
}

export interface IHomePageFeature {

  headline: string;

  description: string;
}
