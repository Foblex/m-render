import { DestroyRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FPopoverService {

  private _popover = new BehaviorSubject<string | null>(null);

  public get popover$(): Observable<string | null> {
    return this._popover.asObservable();
  }

  public show(message: string): void {
    this._popover.next(message);
  //  setTimeout(() => this._popover.next(null), 2000);
  }

  public dispose(destroyRef: DestroyRef): void {
    destroyRef.onDestroy(() => {
      this._popover.next(null);
      this._popover.complete();
    });
  }
}
