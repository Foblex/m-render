import { ComponentRef, Directive, inject, input, OnDestroy, OnInit, Type, ViewContainerRef } from '@angular/core';
import { IExampleComponentInstance } from '../domain/i-example-component-instance';

@Directive({
  standalone: true,
  selector: 'ng-container[fInsertComponent]',
})
export class FInsertComponentDirective implements OnInit, OnDestroy {
  public component = input<Type<IExampleComponentInstance> | null>();

  private readonly _viewContainerRef = inject(ViewContainerRef);
  private _componentRef: ComponentRef<IExampleComponentInstance> | null = null;

  public ngOnInit(): void {
    const component = this.component();
    if (!component) {
      return;
    }
    this._createComponent(component);
  }

  private _createComponent(component: Type<IExampleComponentInstance>): void {
    this._viewContainerRef.clear();
    this._componentRef = this._viewContainerRef.createComponent(component);
    this._componentRef.instance?.initialize?.();
  }

  public ngOnDestroy(): void {
    this._componentRef?.destroy();
    this._viewContainerRef.clear();
  }
}
