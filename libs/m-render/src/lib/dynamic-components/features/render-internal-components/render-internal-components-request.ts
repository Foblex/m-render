import { ViewContainerRef } from '@angular/core';

export class RenderInternalComponentsRequest {
  public static requestToken = Symbol('RenderInternalComponentsRequest');

  constructor(
    public readonly hostElement: HTMLElement,
    public readonly viewContainerRef: ViewContainerRef,
  ) {
  }
}
