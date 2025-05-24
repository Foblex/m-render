import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostListener,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { startWith } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FNavigationItemComponent } from './f-navigation-item/f-navigation-item.component';
import { FNavigationHeaderComponent } from './f-navigation-header/f-navigation-header.component';
import { FNavigationGroupComponent } from './f-navigation-group/f-navigation-group.component';
import {
  HandleNavigationLinksHandler,
  HandleNavigationLinksRequest,
  INavigationItem,
} from './domain';
import { deepClone } from '@foblex/utils';
import { FBadgeComponent } from '../index';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { F_NAVIGATION_PROVIDER, F_TOGGLE_NAVIGATION_COMPONENT } from '../../domain';

@Component({
  selector: 'f-navigation-panel',
  templateUrl: './f-navigation-panel.component.html',
  styleUrls: ['./f-navigation-panel.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HandleNavigationLinksHandler],
  imports: [
    FNavigationHeaderComponent,
    FNavigationItemComponent,
    FNavigationGroupComponent,
    RouterLink,
    FBadgeComponent,
  ],
})
export class FNavigationPanelComponent implements OnInit, AfterViewInit {
  private readonly _provider = inject(F_NAVIGATION_PROVIDER);
  private readonly _parent = inject(F_TOGGLE_NAVIGATION_COMPONENT, {
    optional: true,
  });
  private readonly _router = inject(Router);
  private readonly _injector = inject(Injector);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _destroyRef = inject(DestroyRef);
  // protected readonly items = viewChildren(FNavigationItemComponent);

  protected value: string | undefined;
  protected navigation = this._provider.getNavigation();

  public ngOnInit(): void {
    const currentPath = this._router.url;
    const prefix = currentPath.substring(0, currentPath.lastIndexOf('/'));
    const navigation = deepClone(this._provider.getNavigation());
    navigation.forEach((group) => {
      group.items.forEach((item) => {
        this.normalizeLink(item, prefix);
      });
    });
    this.navigation = navigation;
  }

  private normalizeLink(item: INavigationItem, prefix: string): void {
    if (item.link && !this.isExternalLink(item.link)) {
      item.link = item.link.startsWith('/')
        ? `${prefix}${item.link}`
        : `${prefix}/${item.link}`;
    }
  }

  private isExternalLink(href: string): boolean {
    return href.startsWith('www') || href.startsWith('http');
  }

  public ngAfterViewInit(): void {
    this._subscribeOnRouteChanges();
  }

  private _subscribeOnRouteChanges(): void {
    this._router.events
      .pipe(
        startWith(new NavigationEnd(1, '', '')),
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this._highlightLink(this._router.url);
        this._parent?.onToggleNavigation(false);
        this._changeDetectorRef.detectChanges();
      });
  }

  private _highlightLink(url: string): void {
    this.value = undefined;
    this.navigation.forEach((group) => {
      this.value =
        group.items.find((x) => {
          return url.endsWith(x.link);
        })?.link || this.value;
    });
  }

  @HostListener('click', ['$event'])
  protected _onDocumentClick(event: MouseEvent): void {
    this._injector
      .get(HandleNavigationLinksHandler)
      .handle(new HandleNavigationLinksRequest(event));
  }
}
