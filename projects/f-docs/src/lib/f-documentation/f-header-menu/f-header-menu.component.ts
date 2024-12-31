import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FEnvironmentService, IDocsHeaderNavigationItem } from '../../domain';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'f-header-menu',
  templateUrl: './f-header-menu.component.html',
  styleUrls: [ './f-header-menu.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink
  ]
})
export class FHeaderMenuComponent implements OnInit {

  protected navigation: IDocsHeaderNavigationItemViewModel[] = [];

  constructor(
    private fEnvironmentService: FEnvironmentService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.navigation = this.fEnvironmentService.getHeaderNavigation().map((x) => {
      return {
        ...x,
        isActive: this.router.url.startsWith(x.link)
      };
    });
  }
}

type IDocsHeaderNavigationItemViewModel = IDocsHeaderNavigationItem & { isActive: boolean };
