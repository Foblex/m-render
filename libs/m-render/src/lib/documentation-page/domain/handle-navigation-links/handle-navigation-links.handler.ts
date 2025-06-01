import { HandleNavigationLinksRequest } from './handle-navigation-links.request';
import { Router } from '@angular/router';
import { BrowserService } from '@foblex/platform';

export class HandleNavigationLinksHandler {

  public handle(request: HandleNavigationLinksRequest): void {
    const target = this._getClosestAnchorTag(this._getTargetElement(request.event));

    if (target && this._hasHref(target)) {
      request.event.preventDefault();

      const href = target.getAttribute('href')!;
      if (!this._isExternalLink(href)) {
        this._navigateInternalLink(href, request.router);
      } else {
        this._navigateExternalLink(href, request.browser);
      }
    }
  }

  private _getTargetElement(event: Event): HTMLElement | null {
    return event?.target as HTMLElement;
  }

  private _getClosestAnchorTag(element: HTMLElement | null): HTMLElement | undefined | null {
    return element?.closest('a');
  }

  private _hasHref(element: HTMLElement): boolean {
    return element.hasAttribute('href');
  }

  private _isExternalLink(href: string): boolean {
    return href.startsWith('www') || href.startsWith('http');
  }

  private _navigateInternalLink(href: string, router: Router): void {
    if (href.startsWith('/')) {
      href = href.substring(1);
    }
    router.navigate([href]).then();
  }

  private _navigateExternalLink(href: string, browser: BrowserService): void {
    browser.window.open(href, '_blank');
  }
}
