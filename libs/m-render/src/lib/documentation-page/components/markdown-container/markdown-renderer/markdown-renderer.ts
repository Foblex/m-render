import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  Injector,
  OnDestroy,
  OnInit,
  signal,
  untracked,
  ViewContainerRef,
} from '@angular/core';
import { debounceTime, of, startWith, switchMap } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicComponentsStore } from '../../../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MarkdownService } from './utils';
import {
  CalculateTableOfContentDataHandler,
  CalculateTableOfContentDataRequest,
  RenderInternalComponentsRequest,
} from '../../scrollable-container';
import { HandleNavigationLinksHandler, HandleNavigationLinksRequest } from '../../../domain';
import { IS_BROWSER_PLATFORM, WINDOW } from '../../../../common';
import { FMarkdownFooterComponent } from './f-markdown-footer';
import { Mediatr } from '../../../../mediatr';
import { DYNAMIC_COMPONENTS_MODULE_PROVIDERS } from '../../../../dynamic-components';
import { HighlightService } from '../../../../highlight';

@Component({
  selector: 'markdown-renderer',
  templateUrl: './markdown-renderer.html',
  styleUrls: ['./markdown-renderer.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    HighlightService,
    MarkdownService,
    ...DYNAMIC_COMPONENTS_MODULE_PROVIDERS,
  ],
  imports: [FMarkdownFooterComponent],
  host: {
    class: 'm-render',
  },
})
export class MarkdownRenderer implements OnInit, OnDestroy {
  protected value = signal<SafeHtml | undefined>(undefined);

  private readonly _hostElement = inject(ElementRef).nativeElement;
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);
  private readonly _isBrowser = inject(IS_BROWSER_PLATFORM);
  private readonly _window = inject(WINDOW)
  private readonly _markdown = inject(MarkdownService);
  private readonly _dynamicComponents = inject(DynamicComponentsStore);
  private readonly _mediatr = inject(Mediatr);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  private get _markdownPath(): string {
    return this._activatedRoute.snapshot.url.map((x) => x.path).join('/');
  }

  public ngOnInit(): void {
    this._updateRenderDependencies();
    this._subscribeOnRouteChanges();
  }

  private _subscribeOnRouteChanges(): void {
    this._router.events
      .pipe(
        startWith(null),
        debounceTime(50),
        switchMap(() =>
          this._markdown.parseUrl(
            this._provider.getMarkdownUrl(this._markdownPath),
          ),
        ),
        tap((x) => this.value.set(x)),
        catchError((e, data) => {
          console.error('[MarkdownRenderer] parse error:', e);
          return of(data);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  private _updateRenderDependencies(): void {
    effect(
      () => {
        const html = this.value();
        if (html && this._isBrowser) {
          untracked(() => {
            raf(() => { // Wait for HTML to be rendered before initializing dynamic components and TOC
              this._mediatr.execute(new RenderInternalComponentsRequest(this._hostElement, this._viewContainerRef));
              new CalculateTableOfContentDataHandler(
                this._injector,
              ).handle(new CalculateTableOfContentDataRequest(this._hostElement));
            });
          });
        }
      },
      { injector: this._injector },
    );
  }

  @HostListener('click', ['$event'])
  protected _onDocumentClick(event: MouseEvent): void {
    new HandleNavigationLinksHandler().handle(
      new HandleNavigationLinksRequest(event, this._window, this._router),
    );
  }

  public ngOnDestroy(): void {
    this._dynamicComponents.dispose();
  }
}

const raf = typeof requestAnimationFrame === 'function'
  ? requestAnimationFrame
  : (fn: FrameRequestCallback) => setTimeout(fn);
