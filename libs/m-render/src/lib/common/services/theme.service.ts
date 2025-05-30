import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BrowserService } from '@foblex/platform';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly _browser = inject(BrowserService);
  private readonly _theme = new Subject<void>();

  public get theme$(): Observable<void> {
    return this._theme.asObservable();
  }

  public updateTheme(): void {
    this._theme.next();
  }

  public getPreferredTheme(): string {
    return this._browser.localStorage.getItem('preferred-theme')
      || (this._browser.window.isMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light');
  }
}
