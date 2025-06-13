import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { IMetaData } from './i-meta-data';
import { FHeadTagService } from './f-head-tag.service';
import { tap } from 'rxjs/operators';
import { DOCUMENTATION_CONFIGURATION } from '../../domain';
import { INavigationGroup, INavigationItem } from '../../components';
import { LOCATION } from '@foblex/mr-common';

@Injectable()
export class FMetaService {
  private readonly _location = inject(LOCATION);
  private readonly _router = inject(Router);
  private readonly _headTag = inject(FHeadTagService);
  private readonly _configuration = inject(DOCUMENTATION_CONFIGURATION);

  public changes(): Observable<void> {
    return this._router.events.pipe(
      startWith(new NavigationEnd(1, '', '')),
      filter(event => event instanceof NavigationEnd),
      map(() => void 0),
      tap(() => {
        if (!this._configuration.meta) {
          return;
        }
        const defaultData = this._configuration.meta;

        const data = {
          ...defaultData,
        };
        const item = this._findDocItemByUrl(this._findDocGroupByUrl(this._router.url), this._router.url);
        if (item) {
          data.title = `${item.text} - ${defaultData.app_name}`;
          data.url = this._location.href;
          data.description = item.description || defaultData.description;
          data.image = item.image || defaultData.image;
          data.image_width = item.image_width || defaultData.image_width;
          data.image_height = item.image_height || defaultData.image_height;
          data.image_type = item.image_type || defaultData.image_type;
        }
        if (!data.url) {
          data.url = this._location.origin + this._router.url;
        }
        if (!data.image.startsWith('http') && !data.image.startsWith('www')) {
          if (data.image.startsWith('.')) {
            data.image = this._location.origin + data.image.slice(1);
          } else {
            data.image = this._location.origin + data.image;
          }
        }
        if (!data.url.endsWith('/')) {
          data.url += '/';
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

  private _updateMetaTags(item: IMetaData): void {
    this._headTag.setTitle(item.title);
    this._headTag.setDescription(item.description);
    this._headTag.setCanonical(item.url);

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


