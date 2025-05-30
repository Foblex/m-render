import { Type } from "@angular/core";
import { IExampleComponentInstance } from './i-example-component-instance';

export interface IExampleComponent {
  selector: string;
  component: Promise<Type<IExampleComponentInstance>>;
}
