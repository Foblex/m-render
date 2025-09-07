import { ViewContainerRef } from '@angular/core';

export class RenderExternalComponentRequest {
  public static requestToken = Symbol('RenderExternalComponentRequest');

  constructor(
    public readonly selector: string,
    public readonly viewContainerRef: ViewContainerRef,
  ) {
  }
}
