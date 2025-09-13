import { ChangeDetectionStrategy, Component, inject, input, OnInit, viewChild, ViewContainerRef } from '@angular/core';
import { coerceComponentHeight } from './utils/coerce-component-height';
import { parseComponentTag } from './utils/parse-component-tag';
import { IExampleViewData } from './domain/i-example-view-data';
import { IParsedContainerData } from '../../../documentation-page';
import { Mediatr } from '../../../mediatr';
import { RenderExternalComponentRequest } from '../../features';

@Component({
  selector: 'external-component',
  templateUrl: './external-component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'f-example-view',
    '[style.height]': 'data().height',
  },
})
export class ExternalComponent implements OnInit {
  public readonly data = input.required<IExampleViewData, IParsedContainerData>({
    transform: (x) => {
      return {
        height: coerceComponentHeight(x.height),
        value: parseComponentTag(x.value) || '',
      };
    },
  });

  private readonly _mediatr = inject(Mediatr);
  private readonly _viewContainerRef = viewChild.required('container', { read: ViewContainerRef });

  public ngOnInit(): void {
    this._mediatr.execute(new RenderExternalComponentRequest(this.data().value, this._viewContainerRef()));
  }
}
