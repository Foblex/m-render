import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { INTERNAL_ENVIRONMENT_SERVICE } from '../../domain';
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

  protected version$: Observable<string | undefined> = inject(INTERNAL_ENVIRONMENT_SERVICE).getVersion();
}
