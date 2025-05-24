import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FCodeGroupTabsComponent } from "./f-code-group-tabs/f-code-group-tabs.component";
import { FExampleViewComponent } from "../f-example-view";
import { FCodeViewComponent } from "../f-code-view";
import { EParsedContainerType, IParsedContainerData } from "@f-markdown";

@Component({
  selector: 'f-code-group',
  templateUrl: './f-code-group.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FCodeGroupTabsComponent,
    FCodeViewComponent,
    FExampleViewComponent,
  ],
  host: {
    class: 'f-code-group',
  },
})
export class FCodeGroupComponent {
  public data = signal<IParsedContainerData[]>([]);

  protected index = signal<number>(0);
  protected containerType = EParsedContainerType;

  protected onTabClick(index: number): void {
    this.index.set(index);
  }
}
