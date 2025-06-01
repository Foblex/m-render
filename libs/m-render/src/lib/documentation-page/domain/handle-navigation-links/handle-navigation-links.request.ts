import { BrowserService } from '@foblex/platform';
import { Router } from '@angular/router';

export class HandleNavigationLinksRequest {
  constructor(
    public event: MouseEvent,
    public browser: BrowserService,
    public router: Router,
  ) {
  }
}
