import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IHeaderMenuLink } from '../domain';
import { HEADER_CONFIGURATION_STORE } from '../../../domain';

@Component({
  selector: 'inline-menu',
  templateUrl: './inline-menu.component.html',
  styleUrls: [ './inline-menu.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
  ],
})
export class InlineMenuComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _store = inject(HEADER_CONFIGURATION_STORE);

  protected navigation: IDocsHeaderNavigationItemViewModel[] = [];
  protected isOverflowed = signal(false);

  public ngOnInit(): void {
    this.navigation = this._store.getHeader()?.navigation?.map((x) => {
      return {
        ...x,
        isActive: this._router.url.startsWith(x.link),
      };
    }) || [];
  }

  protected overflowed(event: boolean): void {
    this.isOverflowed.set(event);
  }
}

type IDocsHeaderNavigationItemViewModel = IHeaderMenuLink & { isActive: boolean };
