import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GTAG_CONFIG } from './provide-g-tag';

interface IWindowWithGTag {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

type ConsentState = 'granted' | 'denied';

@Injectable()
export class GTagService {
  private readonly _config = inject(GTAG_CONFIG);
  private readonly _document = inject(DOCUMENT);
  private _initialized = false;

  public initialize() {
    console.log('[GTag] Initializing with ID:', this._config.id);
    if (this._initialized) {
      return;
    }
    this._initialized = true;

    const window = this._getGtagWindow();
    if (!window) {
      console.warn('[GTag] Initialization failed: No window available.');
      this._initialized = false;
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };

    this._loadGtagScript(this._config.id);
    window.gtag('js', new Date());
    window.gtag('config', this._config.id);
  }

  private _getGtagWindow(): IWindowWithGTag | null {
    const result = this._document.defaultView as unknown as IWindowWithGTag | null;

    if (!result?.gtag) {
      console.warn('[GTag] gtag function is not available. Ensure the script is loaded.');
    }

    return result;
  }

  private _loadGtagScript(id: string): void {
    if (this._document.querySelector('#gtag-script')) return;

    const script = this._document.createElement('script');
    script.id = 'gtag-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    this._document.head.appendChild(script);
  }

  public updateConsent(granted: boolean): void {
    const window = this._getGtagWindow();
    if (!window?.gtag) {
      console.warn('[GTag] Cannot update consent: gtag not available.');
      return;
    }

    const state: ConsentState = granted ? 'granted' : 'denied';

    const consentOptions = {
      ad_user_data: state,
      ad_personalization: state,
      ad_storage: state,
      analytics_storage: state,
    };

    if (state === 'denied') {
      window.gtag('consent', 'default', {
        ...consentOptions,
        wait_for_update: 500,
      });
    } else {
      window.gtag('consent', 'update', {
        ...consentOptions,
      });
    }
  }

  public trackEvent(action: string, params?: Record<string, unknown>): void {
    this._getGtagWindow()?.gtag?.('event', action, params || {});
  }
}
