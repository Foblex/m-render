import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'draggable-flow',
  styleUrls: [ './draggable-flow.component.scss' ],
  templateUrl: './draggable-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DraggableFlowComponent {}
