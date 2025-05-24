import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { F_NAVIGATION_PROVIDER, IDocsHeaderNavigationItem } from '../../../domain';

@Component({
  selector: 'f-header-menu',
  templateUrl: './f-header-menu.component.html',
  styleUrls: [ './f-header-menu.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
  ],
})
export class FHeaderMenuComponent implements OnInit {

  private readonly _router = inject(Router);
  private readonly _provider = inject(F_NAVIGATION_PROVIDER);

  protected navigation: IDocsHeaderNavigationItemViewModel[] = [];

  public ngOnInit(): void {
    this.navigation = this._provider.getHeaderNavigation().map((x) => {
      return {
        ...x,
        isActive: this._router.url.startsWith(x.link),
      };
    });
  }
}

type IDocsHeaderNavigationItemViewModel = IDocsHeaderNavigationItem & { isActive: boolean };
