import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, DestroyRef, HostListener, inject, OnInit,
} from '@angular/core';
import { FFooterNavigationButtonComponent, FFooterNavigationComponent } from './f-footer-navigation';
import { FFooterEditInformationComponent } from './f-footer-edit-information';
import { FFooterEditLinkComponent } from './f-footer-edit-information/f-footer-edit-link';
import { debounceTime, startWith } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GetPreviousNextPageNavigationHandler,
  GetPreviousNextPageNavigationRequest,
  IMarkdownFooterLink, IMarkdownFooterNavigation,
} from './domain';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DocumentationStore } from '../../../../../services';
import { HandleNavigationLinksHandler, HandleNavigationLinksRequest } from '../../../../../domain';
import { WINDOW } from '@foblex/mr-common';

@Component({
  selector: 'footer [f-markdown-footer]',
  templateUrl: './f-markdown-footer.component.html',
  styleUrls: ['./f-markdown-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FFooterNavigationComponent,
    FFooterNavigationButtonComponent,
    FFooterEditInformationComponent,
    FFooterEditLinkComponent,
  ],
  standalone: true,
})
export class FMarkdownFooterComponent implements OnInit {
  private readonly _provider = inject(DocumentationStore);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _window = inject(WINDOW);

  protected navigation: IMarkdownFooterNavigation = {};
  protected editLink: string | undefined;
  protected previousLink: IMarkdownFooterLink | undefined;
  protected nextLink: IMarkdownFooterLink | undefined;

  public ngOnInit(): void {
    this._router.events
      .pipe(
        startWith(null), debounceTime(10), takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this._updateData())
  }

  private _updateData(): void {
    const currentPath = this._router.url;
    const prefix = currentPath.substring(0, currentPath.lastIndexOf('/'));
    this.navigation = JSON.parse(
      JSON.stringify(this._provider.getFooterNavigation()),
    );
    if (this.navigation.editLink) {
      this.editLink = this._getEditLink();
    }
    const previousNext = new GetPreviousNextPageNavigationHandler(
      this._provider,
    ).handle(new GetPreviousNextPageNavigationRequest(this._getCurrentLink()));
    this.previousLink = previousNext.previousLink;
    this._normalizeLink(this.previousLink, prefix);
    this.nextLink = previousNext.nextLink;
    this._normalizeLink(this.nextLink, prefix);
    this._changeDetectorRef.markForCheck();
  }

  private _normalizeLink(
    item: IMarkdownFooterLink | undefined,
    prefix: string,
  ): void {
    if (item?.link && !this._isExternalLink(item.link)) {
      item.link = item.link.startsWith('/')
        ? `${prefix}${item.link}`
        : `${prefix}/${item.link}`;
    }
  }

  private _isExternalLink(href: string): boolean {
    return href.startsWith('www') || href.startsWith('http');
  }

  private _getEditLink(): string {
    return this.navigation.editLink!.pattern + this._getCurrentLink() + '.md';
  }

  private _getCurrentLink(): string {
    return this._activatedRoute.snapshot.url.map((x) => x.path).join('/');
  }

  @HostListener('click', ['$event'])
  protected _onDocumentClick(event: MouseEvent): void {
    new HandleNavigationLinksHandler().handle(
      new HandleNavigationLinksRequest(event, this._window, this._router),
    );
  }
}
