import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, OnDestroy, OnInit
} from '@angular/core';
import { FNavigationPanelComponent } from '../f-navigation-panel';
import { FHeaderComponent } from './f-header/f-header.component';
import { FScrollableContainerComponent } from '../f-scrollable-container';
import { RouterOutlet } from '@angular/router';
import { F_DOCUMENTATION_COMPONENT, IDocumentationComponent } from './i-documentation-component';
import { FEnvironmentService, FPopoverService } from '../domain';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f-documentation',
  templateUrl: './f-documentation.component.html',
  styleUrls: [ './f-documentation.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FEnvironmentService,
    FPopoverService,
    { provide: F_DOCUMENTATION_COMPONENT, useExisting: FDocumentationComponent }
  ],
  imports: [
    FNavigationPanelComponent,
    FHeaderComponent,
    FScrollableContainerComponent,
    RouterOutlet
  ]
})
export class FDocumentationComponent implements IDocumentationComponent, OnInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  protected isNavigationVisible: boolean = false;

  protected popoverMessage: string | null = null;

  constructor(
    private fPopoverService: FPopoverService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit() {
    this.subscriptions$.add(this.subscribeOnPopover());
  }

  private subscribeOnPopover(): Subscription {
    return this.fPopoverService.popover$.subscribe((x) => {
      this.popoverMessage = x;
      this.changeDetectorRef.markForCheck();
    });
  }

  public onToggleNavigation(value: boolean): void {
    this.isNavigationVisible = value;
    this.changeDetectorRef.markForCheck();
  }

  public ngOnDestroy() {
    this.fPopoverService.dispose();
    this.subscriptions$.unsubscribe();
  }
}
