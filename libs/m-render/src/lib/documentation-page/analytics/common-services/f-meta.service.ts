import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { IMetaData } from './i-meta-data';
import { FHeadTagService } from './f-head-tag.service';
import { tap } from 'rxjs/operators';
import { DOCUMENTATION_CONFIGURATION } from '../../domain';
import { INavigationGroup, INavigationItem } from '../../components';
import { LOCATION } from '../../../common';

@Injectable()
export class FMetaService {
  private readonly _location = inject(LOCATION);
  private readonly _router = inject(Router);
  private readonly _headTag = inject(FHeadTagService);
  private readonly _configuration = inject(DOCUMENTATION_CONFIGURATION);

  public changes(): Observable<string> {
    return this._router.events.pipe(
      startWith(null),
      filter((e): e is NavigationEnd | null => e === null || e instanceof NavigationEnd),
      map(() =>this._router.url),
      tap((currentUrl) => {
        const defaultData = this._configuration.meta;
        if (!defaultData) return;

        const data = { ...defaultData };

        const item = this._findDocItemByUrl(this._findDocGroupByUrl(currentUrl), currentUrl);
        if (item) {
          data.title = `${item.pageTitle || item.text} | ${defaultData.app_name}`;
          data.url = this._buildAbsoluteUrl(currentUrl);
          data.canonical = item.canonical;
          data.description = item.description || defaultData.description;
          data.image = item.image || defaultData.image;
          data.image_width = item.image_width || defaultData.image_width;
          data.image_height = item.image_height || defaultData.image_height;
          data.image_type = item.image_type || defaultData.image_type;
        }
        if (!data.url) {
          data.url = this._buildAbsoluteUrl(currentUrl);
        }

        if (data.image) {
          data.image = this._toAbsoluteUrl(data.image);
        }

        this._updateMetaTags(data);
      }),
    );
  }

  public dispose(): void {
    if (!this._configuration.meta) {
      return;
    }
    this._updateMetaTags(this._configuration.meta);
  }

  private _findDocGroupByUrl(url: string): INavigationGroup | undefined {
    return this._configuration.navigation.find((g: INavigationGroup) => g.items.find((i: INavigationItem) => url.endsWith(i.link)));
  }

  private _findDocItemByUrl(group: INavigationGroup | undefined, url: string): INavigationItem | undefined {
    return (group?.items || []).find((i: INavigationItem) => url.endsWith(i.link));
  }

  private _buildAbsoluteUrl(url: string): string {
    try {
     return new URL(url, this._location.origin).toString();
    } catch {
     return this._location.origin + url;
    }
  }

  private _toAbsoluteUrl(maybeRelative: string): string {
    try {
     return new URL(maybeRelative, this._location.origin).toString();
    } catch {
     return maybeRelative;
    }
  }

  private _updateMetaTags(item: IMetaData): void {
    this._headTag.setTitle(item.title);
    this._headTag.setDescription(item.description);
    this._headTag.setCanonical(item.canonical || item.url);

    this._headTag.updateTag({ property: 'og:url', content: item.url });
    this._headTag.updateTag({ property: 'og:type', content: item.type });
    this._headTag.updateTag({ property: 'og:title', content: item.title });
    this._headTag.updateTag({ property: 'og:site_name', content: item.title });
    this._headTag.updateTag({ property: 'og:locale', content: item.locale });
    this._headTag.updateTag({ property: 'og:description', content: item.description });
    this._headTag.updateTag({ property: 'og:image', content: item.image });
    this._headTag.updateTag({ property: 'og:image:secure_url', content: item.image });
    this._headTag.updateTag({ property: 'og:image:type', content: item.image_type });
    this._headTag.updateTag({ property: 'og:image:width', content: item.image_width.toString() });
    this._headTag.updateTag({ property: 'og:image:height', content: item.image_height.toString() });
  }
}


