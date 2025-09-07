import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ConsentState, GTAG_CONFIG, GTagConfig } from './provide-g-tag';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class GTagService {
  private readonly _config = inject<GTagConfig>(GTAG_CONFIG);
  private readonly _document = inject(DOCUMENT);
  private readonly _router = inject(Router, { optional: true });
  private _initialized = false;
  private _configuredIds = new Set<string>();

  public initialize(): void {
    if (this._initialized) return;

    const win = this._document.defaultView as (Window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
      __gtagLoaded__?: boolean;
    }) | null;

    if (!win) {
      return;
    }

    win.dataLayer = win.dataLayer || [];
    win.gtag = win.gtag || ((...args: unknown[]) => win.dataLayer!.push(args));

    const initialConsent: ConsentState = this._config.initialConsent ?? 'denied';
    this._setConsent(initialConsent);

    if (!win.__gtagLoaded__) {
      this._appendScript(this._config.id);
      win.__gtagLoaded__ = true;
    }

    win.gtag('js', new Date());

    this._configAll([this._config.id, ...(this._config.extraIds ?? [])]);

    if (this._config.autoPageview && this._router) {
      this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
        this.pageview();
      });
    }

    this._initialized = true;
  }

  public updateConsent(granted: boolean): void {
    this._setConsent(granted ? 'granted' : 'denied');
  }

  public event(action: string, params?: Record<string, unknown>): void {
    const win = this._document.defaultView as any;
    win?.gtag?.('event', action, params || {});
  }

  public pageview(path?: string): void {
    const win = this._document.defaultView as any;
    const p = path ?? this._document.location?.pathname ?? '/';
    for (const id of this._getConfiguredIds()) {
      win?.gtag?.('config', id, { page_path: p });
    }
  }

  public adsConversion(sendTo: string, params?: Record<string, unknown>): void {
    this.event('conversion', { send_to: sendTo, ...params });
  }

  private _setConsent(state: ConsentState): void {
    const win = this._document.defaultView as any;
    const base = {
      ad_user_data: state,
      ad_personalization: state,
      ad_storage: state,
      analytics_storage: state,
    };
    if (state === 'denied') {
      win?.gtag?.('consent', 'default', { ...base, wait_for_update: 500 });
    } else {
      win?.gtag?.('consent', 'update', base);
    }
  }

  private _appendScript(id: string): void {
    if (this._document.querySelector('#gtag-script')) return;
    const s = this._document.createElement('script');
    s.id = 'gtag-script';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    this._document.head.appendChild(s);
  }

  private _configAll(ids: string[]): void {
    const win = this._document.defaultView as any;
    ids.filter(Boolean).forEach(id => {
      if (this._configuredIds.has(id)) return;
      win?.gtag?.('config', id);
      this._configuredIds.add(id);
    });
  }

  private _getConfiguredIds(): string[] {
    return Array.from(this._configuredIds.values());
  }
}
