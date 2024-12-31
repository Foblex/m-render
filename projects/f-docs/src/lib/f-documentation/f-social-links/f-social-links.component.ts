import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { FEnvironmentService, IDocsSocialLink } from '../../domain';

@Component({
  selector: 'f-social-links',
  templateUrl: './f-social-links.component.html',
  styleUrls: [ './f-social-links.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSocialLinksComponent {

  public get links(): IDocsSocialLink[] {
    return this.fEnvironmentService.getSocialLinks();
  }

  constructor(
    private fEnvironmentService: FEnvironmentService
  ) {
  }
}
