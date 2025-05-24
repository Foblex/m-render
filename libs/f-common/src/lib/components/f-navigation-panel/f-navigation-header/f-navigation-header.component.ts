import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { F_NAVIGATION_PROVIDER } from '../../../domain';

@Component({
  selector: 'a[f-navigation-header]',
  templateUrl: './f-navigation-header.component.html',
  styleUrls: [ './f-navigation-header.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FNavigationHeaderComponent {

  private readonly _provider = inject(F_NAVIGATION_PROVIDER);

  protected title = this._provider.getTitle();
  protected image = this._provider.getLogo();
}
