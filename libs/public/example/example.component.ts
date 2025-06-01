import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'example',
  styleUrls: [ './example.component.scss' ],
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ExampleComponent{

}
