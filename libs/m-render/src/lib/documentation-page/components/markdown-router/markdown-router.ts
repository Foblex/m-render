import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { catchError, filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DocumentationStore } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { MarkdownRenderer, MarkdownService } from '../markdown-renderer';

@Component({
  selector: 'markdown-router',
  templateUrl: './markdown-router.html',
  styleUrls: ['./markdown-router.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'ngSkipHydration': '',
    '[class.empty-navigation]': 'emptyNavigation',
  },
  imports: [
    MarkdownRenderer,
  ],
})
export class MarkdownRouter {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _markdown = inject(MarkdownService);
  private readonly _dataProvider = inject(DocumentationStore);

  protected readonly emptyNavigation = !this._dataProvider.getNavigation().length;

  private readonly _path$ = this._router.events.pipe(
    startWith(null),
    filter((e): e is NavigationEnd | null => e === null || e instanceof NavigationEnd),
    map(() => this._activatedRoute.snapshot.url.map(u => u.path).join('/')),
    distinctUntilChanged(),
  );

  protected readonly html = toSignal<SafeHtml | undefined>(
    this._path$.pipe(
      switchMap(path => {
        const url = this._dataProvider.getMarkdownUrl(path);
        return this._markdown.parseUrl(url).pipe(
          catchError(err => {
            console.error('[MarkdownRouter] parse error:', err, { path, url });
            return of<SafeHtml | undefined>(undefined); // или return EMPTY;
          }),
        );
      }),
    ),
    { initialValue: undefined },
  );
}

