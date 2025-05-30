import { FExecutionRegister, IExecution } from '@foblex/mediator';
import { HandleNavigationLinksRequest } from './handle-navigation-links.request';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserService } from '@foblex/platform';

@Injectable()
@FExecutionRegister(HandleNavigationLinksRequest)
export class HandleNavigationLinksHandler
  implements IExecution<HandleNavigationLinksRequest, void> {
  private readonly _router = inject(Router);
  private readonly _browser = inject(BrowserService);

  public handle(request: HandleNavigationLinksRequest): void {
    const target = this._getClosestAnchorTag(this._getTargetElement(request.event));

    if (target && this._hasHref(target)) {
      request.event.preventDefault();

      const href = target.getAttribute('href')!;
      if (!this._isExternalLink(href)) {
        this._navigateInternalLink(href);
      } else {
        this._navigateExternalLink(href);
      }
    }
  }

  private _getTargetElement(event: Event): HTMLElement {
    return event.target as HTMLElement;
  }

  private _getClosestAnchorTag(element: HTMLElement): HTMLElement | null {
    return element.closest('a');
  }

  private _hasHref(element: HTMLElement): boolean {
    return element.hasAttribute('href');
  }

  private _isExternalLink(href: string): boolean {
    return href.startsWith('www') || href.startsWith('http');
  }

  private _navigateInternalLink(href: string): void {
    if (href.startsWith('/')) {
      href = href.substring(1);
    }
    this._router.navigate([href]).then();
  }

  private _navigateExternalLink(href: string): void {
    this._browser.window.open(href, '_blank');
  }
}
