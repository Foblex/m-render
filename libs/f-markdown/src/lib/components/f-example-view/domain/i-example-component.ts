import { Type } from "@angular/core";
import { IExampleComponentInstance } from './i-example-component-instance';

export interface IExampleComponent {
  tag: string;
  component: Type<IExampleComponentInstance> | Promise<Type<IExampleComponentInstance>>;
}
