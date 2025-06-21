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
} from '@angular/core';
import { debounceTime, of, startWith, switchMap } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentationStore } from '../../../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MarkdownService } from './markdown';
import {
  CalculateTableOfContentDataHandler,
  CalculateTableOfContentDataRequest,
  RenderDynamicComponentsHandler,
  RenderDynamicComponentsRequest,
} from '../../scrollable-container';
import { FMarkdownFooterComponent } from './components';
import { HandleNavigationLinksHandler, HandleNavigationLinksRequest } from '../../../domain';
import { IS_BROWSER_PLATFORM, WINDOW } from '../../../../common';

@Component({
  selector: 'f-markdown-renderer',
  templateUrl: './f-markdown-renderer.component.html',
  styleUrls: ['./f-markdown-renderer.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MarkdownService,
  ],
  imports: [FMarkdownFooterComponent],
  host: {
    class: 'm-render',
  },
})
export class FMarkdownRendererComponent implements OnInit, OnDestroy {
  protected value = signal<SafeHtml | undefined>(undefined);

  private readonly _hostElement = inject(ElementRef).nativeElement;
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);
  private readonly _isBrowser = inject(IS_BROWSER_PLATFORM);
  private readonly _window = inject(WINDOW)
  private readonly _markdown = inject(MarkdownService);
  private readonly _provider = inject(DocumentationStore);

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
          this._markdown.parse(
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
              new RenderDynamicComponentsHandler(
                this._injector,
              ).handle(new RenderDynamicComponentsRequest(this._hostElement));
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
    this._provider.disposeDComponents();
  }
}

const raf = typeof requestAnimationFrame === 'function'
  ? requestAnimationFrame
  : (fn: FrameRequestCallback) => setTimeout(fn);
