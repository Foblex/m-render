import { inject, Inject, Injectable, Optional, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { F_HOME_PAGE_ENVIRONMENT } from './providers';
import {
  IHomePageEnvironment,
  IHomePageFeature,
  IHomePageFooter,
  IHomePageHero,
  IHomePageLink,
  IHomePageMembership
} from './domain';
import {
  IEnvironmentService
} from '../domain';

@Injectable()
export class FHomePageEnvironmentService implements IEnvironmentService {

  private _environment = inject(F_HOME_PAGE_ENVIRONMENT);

  public getLogo(): string {
    return this._environment.logo;
  }

  public getTitle(): string {
    return this._environment.title;
  }

  public getHero(): IHomePageHero {
    return this._environment.hero;
  }

  public getButtons(): IHomePageLink[] {
    return this._environment.buttons || [];
  }

  public getFeatures(): IHomePageFeature[] {
    return this._environment.features || [];
  }

  public getMemberships(): IHomePageMembership[] {
    return this._environment.memberships || [];
  }

  public getFooter(): IHomePageFooter {
    return this._environment.footer;
  }

  public getBackgroundComponent(): Type<any> | undefined {
    return this._environment.backgroundComponent;
  }

  public getImageComponent(): Type<any> | undefined {
    return this._environment.heroImageComponent;
  }
}
