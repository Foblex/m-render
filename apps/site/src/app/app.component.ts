import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserService } from '@foblex/platform';
import { FCookiePopupComponent } from '@foblex/m-render';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    FCookiePopupComponent,
  ],
})
export class AppComponent implements OnInit {
  private readonly _browser = inject(BrowserService);
  private readonly _renderer = inject(Renderer2);

  protected readonly isBrowser = this._browser.isBrowser();

  public ngOnInit(): void {
    if (this._getPreferredTheme() === 'dark' && !this._isDocumentContainsDarkTheme()) {
      this._renderer.addClass(this._browser.document.documentElement, 'dark');
      this._browser.localStorage.setItem('preferred-theme', 'dark');
    }
  }

  private _getPreferredTheme(): string {
    return this._browser.localStorage.getItem('preferred-theme')
      || (this._browser.window.isMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light');
  }

  private _isDocumentContainsDarkTheme(): boolean {
    return this._browser.document
      .documentElement.classList.contains('dark');
  }
}
