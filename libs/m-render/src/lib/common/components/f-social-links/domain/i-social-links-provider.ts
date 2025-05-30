import { InjectionToken } from '@angular/core';
import { ISocialLink } from './i-social-link';

export interface ISocialLinksProvider {

  getSocialLinks(): ISocialLink[];
}

export const F_SOCIAL_LINKS_PROVIDER = new InjectionToken<ISocialLinksProvider>('F_SOCIAL_LINKS_PROVIDER');
