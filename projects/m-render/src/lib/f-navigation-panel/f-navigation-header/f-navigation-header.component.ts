import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FEnvironmentService } from '../../domain';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'a[f-navigation-header]',
  templateUrl: './f-navigation-header.component.html',
  styleUrls: [ './f-navigation-header.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink
  ]
})
export class FNavigationHeaderComponent {

  protected title: string = '';

  protected image: string = '';

  constructor(
    private router: Router,
    private fEnvironmentService: FEnvironmentService
  ) {
    this.title = this.fEnvironmentService.getTitle();
    this.image = this.fEnvironmentService.getLogo();
  }

  // @HostListener('click')
  // protected onClick(): void {
  //   this.router.navigate(['/']);
  // }
}
