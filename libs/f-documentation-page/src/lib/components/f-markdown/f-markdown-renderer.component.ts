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
import { debounceTime, startWith, switchMap } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import {
  F_SCROLLABLE_CONTAINER,
  HandleNavigationLinksHandler,
  HandleNavigationLinksRequest,
} from '@f-common';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RenderDynamicComponentsHandler,
  RenderDynamicComponentsRequest,
} from './domain';
import { FMarkdownFooterComponent } from '@f-common';
import { FEnvironmentService } from '../../services';
import { HighlightService } from '@f-highlight-code';
import { MarkdownService } from '@f-markdown';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'f-markdown-renderer',
  templateUrl: './f-markdown-renderer.component.html',
  styleUrls: ['./f-markdown-renderer.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MarkdownService,
    HighlightService,
    HandleNavigationLinksHandler,
    RenderDynamicComponentsHandler,
  ],
  imports: [FMarkdownFooterComponent],
  host: {
    class: 'm-render',
  },
})
export class FMarkdownRendererComponent implements OnInit, OnDestroy {
  protected value = signal<SafeHtml | undefined>(undefined);

  private readonly _hostElement = inject(ElementRef).nativeElement;
  private readonly _scrollContainer = inject(F_SCROLLABLE_CONTAINER);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);
  private readonly _dynamicComponents = inject(RenderDynamicComponentsHandler);

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
          this._injector
            .get(MarkdownService)
            .parse(
              this._injector
                .get(FEnvironmentService)
                .getMarkdownUrl(this._markdownPath),
            ),
        ),
        tap((x) => this.value.set(x)),
        catchError((e, data) => data),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  private _updateRenderDependencies(): void {
    effect(
      () => {
        const html = this.value();
        if (html) {
          untracked(() => {
            queueMicrotask(() => { // Need to track before new html is rerendered
              this._scrollContainer.setOnPageNavigation(this._hostElement);
              this._dynamicComponents.handle(
                new RenderDynamicComponentsRequest(this._hostElement),
              );
            });
          });
        }
      },
      { injector: this._injector },
    );
  }

  @HostListener('click', ['$event'])
  protected _onDocumentClick(event: MouseEvent): void {
    this._injector
      .get(HandleNavigationLinksHandler)
      .handle(new HandleNavigationLinksRequest(event));
  }

  public ngOnDestroy(): void {
    this._dynamicComponents.dispose();
  }
}
