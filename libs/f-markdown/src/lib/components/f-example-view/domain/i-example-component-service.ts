import { IExampleComponent } from "./i-example-component";
import { InjectionToken } from "@angular/core";

export interface IExampleComponentService<T extends IExampleComponent> {
  getComponents(): T[];
}

export const F_EXAMPLE_COMPONENT_PROVIDER = new InjectionToken<IExampleComponentService<IExampleComponent>>('F_EXAMPLE_COMPONENT_PROVIDER');
