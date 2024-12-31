import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FEnvironmentService } from '../../domain';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'f-version',
  templateUrl: './f-version.component.html',
  styleUrls: [ './f-version.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe
  ]
})
export class FVersionComponent {

  protected version$: Observable<string | undefined>;

  constructor(
    private fEnvironmentService: FEnvironmentService
  ) {
    this.version$ = this.fEnvironmentService.getVersion();
  }
}
