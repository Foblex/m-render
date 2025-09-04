import { ViewContainerRef } from '@angular/core';

export class RenderInternalComponentsRequest {
  public static fToken = Symbol('RenderInternalComponentsRequest');

  constructor(
    public readonly hostElement: HTMLElement,
    public readonly viewContainerRef: ViewContainerRef,
  ) {
  }
}
