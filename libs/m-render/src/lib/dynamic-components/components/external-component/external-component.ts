import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { coerceComponentHeight } from './utils/coerce-component-height';
import { parseComponentTag } from './utils/parse-component-tag';
import { IExampleViewData } from './domain/i-example-view-data';
import { IParsedContainerData } from '../../../documentation-page';
import { Mediatr } from '../../../mediatr';
import { RenderExternalComponentRequest } from '../../features';
import { parseIframeUrl } from './utils/parse-iframe-url';
import { DOCUMENT } from '@angular/common';
import { IS_BROWSER_PLATFORM } from '../../../common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'external-component',
  templateUrl: './external-component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'f-example-view',
    '[style.height]': 'data().height',
    '[class.f-example-view-fullscreen]': 'isFullscreen()',
  },
})
export class ExternalComponent implements OnInit {
  public readonly data = input.required<IExampleViewData, IParsedContainerData>({
    transform: (x) => {
      const value = x.value?.trim() || '';

      return {
        height: coerceComponentHeight(x.height),
        selector: parseComponentTag(value) || undefined,
        iframeUrl: parseIframeUrl(value) || undefined,
      };
    },
  });

  protected readonly iframeUrl = computed(() => this.data().iframeUrl);
  protected readonly iframeResourceUrl = computed<SafeResourceUrl | undefined>(() => {
    const url = this.iframeUrl();
    if (!url) {
      return undefined;
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  });
  protected readonly hasContent = computed(() => !!this.data().selector || !!this.data().iframeUrl);
  protected readonly canToggleFullscreen = computed(() => {
    return this._isBrowser
      && this.hasContent()
      && typeof this._hostElement.nativeElement.requestFullscreen === 'function'
      && typeof this._document.exitFullscreen === 'function';
  });
  protected readonly fullscreenLabel = computed(() => this.isFullscreen() ? 'Exit full screen' : 'Full screen');
  protected readonly isFullscreen = signal(false);

  private readonly _document = inject(DOCUMENT);
  private readonly _hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _isBrowser = inject(IS_BROWSER_PLATFORM);
  private readonly _mediatr = inject(Mediatr);
  private readonly _viewContainerRef = viewChild.required('container', { read: ViewContainerRef });
  private readonly _sanitizer = inject(DomSanitizer);

  public ngOnInit(): void {
    const selector = this.data().selector;
    if (selector) {
      this._mediatr.execute(new RenderExternalComponentRequest(selector, this._viewContainerRef()));
      return;
    }

    if (!this.data().iframeUrl) {
      console.error('Unsupported example source. Provide either component tag or [url].');
    }
  }

  protected async toggleFullscreen(): Promise<void> {
    if (!this.canToggleFullscreen()) return;

    try {
      if (this._isCurrentElementInFullscreen()) {
        await this._document.exitFullscreen?.();
      } else {
        await this._hostElement.nativeElement.requestFullscreen?.();
      }
    } catch (error) {
      console.error('Unable to toggle full-screen mode for example preview:', error);
    }
  }

  @HostListener('document:fullscreenchange')
  protected onFullscreenChange(): void {
    this.isFullscreen.set(this._isCurrentElementInFullscreen());
  }

  private _isCurrentElementInFullscreen(): boolean {
    return this._document.fullscreenElement === this._hostElement.nativeElement;
  }
}
