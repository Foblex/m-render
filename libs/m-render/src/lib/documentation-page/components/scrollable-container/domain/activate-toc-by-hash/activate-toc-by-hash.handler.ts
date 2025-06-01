import { ActivateTocByHashRequest } from './activate-toc-by-hash.request';
import { Injector } from '@angular/core';
import { DocumentationStore } from '../../../../services';

export class ActivateTocByHashHandler {

  private readonly _provider: DocumentationStore;

  constructor(
    _injector: Injector,
  ) {
    this._provider = _injector.get(DocumentationStore);
  }

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
