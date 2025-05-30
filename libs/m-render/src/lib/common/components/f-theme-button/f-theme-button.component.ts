import {
  ChangeDetectionStrategy,
  Component,
  HostListener, inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { BrowserService, ILocalStorage } from '@foblex/platform';
import { ThemeService } from '../../services';

@Component({
  selector: 'button[f-theme-button]',
  templateUrl: './f-theme-button.component.html',
  styleUrls: [ './f-theme-button.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FThemeButtonComponent implements OnInit {
  private readonly _renderer = inject(Renderer2);
  private readonly _fState = inject(ThemeService);
  private readonly _browser = inject(BrowserService);

  private get _localStorage(): ILocalStorage {
    return this._browser.localStorage;
  }

  private get _documentElement(): HTMLElement {
    return this._browser.document.documentElement;
  }

  public ngOnInit(): void {
    if (this._fState.getPreferredTheme() === 'dark' && !this._isDocumentContainsDarkTheme()) {
      this._renderer.addClass(this._documentElement, 'dark');
      this._localStorage.setItem('preferred-theme', 'dark');
    }
  }

  private _isDocumentContainsDarkTheme(): boolean {
    return this._documentElement.classList.contains('dark');
  }

  @HostListener('click')
  protected _onClick(): void {
    if (this._fState.getPreferredTheme() === 'light' && !this._isDocumentContainsDarkTheme()) {
      this._renderer.addClass(this._documentElement, 'dark');
      this._localStorage.setItem('preferred-theme', 'dark');
    } else {
      this._renderer.removeClass(this._documentElement, 'dark');
      this._localStorage.setItem('preferred-theme', 'light');
    }
    this._fState.updateTheme();
  }
}
