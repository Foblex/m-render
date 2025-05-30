import { Type } from '@angular/core';
import { IHomePageConfiguration } from '../i-home-page-configuration';

export function provideImage(image: Type<any>): Partial<IHomePageConfiguration> {
  return {
    image,
  };
}
