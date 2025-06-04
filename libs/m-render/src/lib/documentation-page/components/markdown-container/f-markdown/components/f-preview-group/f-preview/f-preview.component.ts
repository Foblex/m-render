import {
  ChangeDetectionStrategy,
  Component, DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit, signal,
} from '@angular/core';
import { startWith } from 'rxjs';
import { Router } from '@angular/router';
import { DocumentationStore } from '../../../../../../services';
import { FPreviewBase } from './f-preview-base';
import { FPreviewGroupService } from '../index';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { INavigationGroup, INavigationItem } from '../../../../../navigation-panel';
import { ThemeService } from '../../../../../../../theme';

@Component({
  selector: 'a[f-preview]',
  templateUrl: './f-preview.component.html',
  styleUrls: [ './f-preview.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.href]': 'url',
    '[attr.title]': 'viewModel?.text',
  },
})
export class FPreviewComponent extends FPreviewBase implements OnInit, OnDestroy {

  private _elementReference = inject(ElementRef);
  private _fEnvironment = inject(DocumentationStore);
  private _fPreviewGroupService = inject(FPreviewGroupService);
  private _themeService = inject(ThemeService, { optional: true });
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  public item: string | undefined;
  public group: string | undefined;

  protected viewModel: INavigationItem | undefined;
  protected src = signal<string | undefined>(undefined);
  protected url: string | undefined;

  public get hostElement(): HTMLElement {
    return this._elementReference.nativeElement;
  }

  public get filterKey(): string | undefined {
    return this.viewModel?.badge?.text.toLowerCase();
  }

  public get date(): Date | undefined {
    return this.viewModel?.date;
  }

  public initialize(): void {
    this.viewModel = this._getNavigationItem(this._getNavigationGroup()!);
    this.url = this._normalizeLink(this.viewModel!.link, this._getUrlPrefix());
    this._subscribeToThemeChanges();
  }

  private _subscribeToThemeChanges(): void {
    this._themeService?.theme$.pipe(
      startWith(null), takeUntilDestroyed(this._destroyRef),
    ).subscribe(() => this._updateTheme());
  }

  public ngOnInit(): void {
    this._fPreviewGroupService.add(this);
  }

  private _getNavigationGroup(): INavigationGroup | undefined {
    return this._fEnvironment.getNavigation().find((x) => x.text === this.group);
  }

  private _getNavigationItem(group: INavigationGroup): INavigationItem | undefined {
    return group.items.find((x) => x.link === this.item);
  }

  private _updateTheme(): void {
    this.src.set(this._themeService?.getPreferredTheme() === 'dark' ? this.viewModel?.image_dark : this.viewModel?.image);
    if (!this.src()) {
      this.src.set(this.viewModel?.image);
    }
  }

  private _normalizeLink(link: string, prefix: string): string {
    if (!this._isExternalLink(link)) {
      return link.startsWith('/') ? `${ prefix }${ link }` : `${ prefix }/${ link }`;
    }
    return link;
  }

  private _getUrlPrefix(): string {
    return this._router.url.substring(0, this._router.url.lastIndexOf('/'));
  }

  private _isExternalLink(href: string): boolean {
    return href.startsWith('www') || href.startsWith('http');
  }

  public ngOnDestroy(): void {
    this._fPreviewGroupService.remove(this);
  }
}
