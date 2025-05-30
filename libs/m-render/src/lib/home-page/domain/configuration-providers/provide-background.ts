import { Type } from '@angular/core';
import { IHomePageConfiguration } from '../i-home-page-configuration';

export function provideBackground(background: Type<any>): Partial<IHomePageConfiguration> {
  return {
    background,
  };
}
