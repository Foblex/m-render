import { FExecutionRegister, IExecution } from '@foblex/mediator';
import { ActivateTocByHashRequest } from './activate-toc-by-hash.request';
import { inject, Injectable } from '@angular/core';
import { DocumentationStore } from '../../../../services';

@Injectable()
@FExecutionRegister(ActivateTocByHashRequest)
export class ActivateTocByHashHandler
  implements IExecution<ActivateTocByHashRequest, void> {

  private readonly _provider = inject(DocumentationStore);

  public handle(payload: ActivateTocByHashRequest): void {
    this._provider.tocData.update((data) => ({
      ...data,
      flat: data.flat.map((x) => ({
        ...x,
        isActive: x.hash === payload.hash,
      })),
    }));
  }
}
