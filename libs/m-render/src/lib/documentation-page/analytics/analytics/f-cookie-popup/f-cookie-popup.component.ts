import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { F_LOCAL_STORAGE } from '@foblex/platform';
import { F_ACCEPT_COOKIES_KEY } from '../f-accept-cookies-key';
import { setCookieConsent } from '../set-cookie-consent';

@Component({
  selector: 'f-cookie-popup',
  standalone: true,
  templateUrl: './f-cookie-popup.component.html',
  styleUrls: ['./f-cookie-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FCookiePopupComponent {
  private readonly _storage = inject(F_LOCAL_STORAGE);

  protected readonly hasAccepted = signal<boolean>(false);

  constructor() {
    try {
      this.hasAccepted.set(this._storage?.getItem(F_ACCEPT_COOKIES_KEY) === 'true');
    } catch {
      this.hasAccepted.set(false);
    }
  }

  protected accept(): void {
    try {
      this._storage?.setItem(F_ACCEPT_COOKIES_KEY, 'true');
    } catch { /* empty */ }

    this.hasAccepted.set(true);
    setCookieConsent('granted');
  }
}

