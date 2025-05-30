import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { IVersion } from '../domain';

@Component({
  selector: 'npm-version',
  templateUrl: './npm-version.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NpmVersionComponent {
  public readonly value = input<IVersion>()
  private readonly _http = inject(HttpClient);

  protected version = toSignal(
    this._localVersion(this.value()) ||
    this._npmPackage(this.value()),
  );

  private _localVersion(version: IVersion | undefined): Observable<string | undefined> | undefined {
    return version?.text ? of(version?.text) : undefined;
  }

  private _npmPackage(
    version: IVersion | undefined,
  ): Observable<string | undefined> {
    const packageName = version?.npmPackage;
    if (!packageName) {
      return of(undefined);
    }

    return this._http
      .get<{ 'dist-tags': { latest: string } }>(
        this._npmRegistry(packageName),
      )
      .pipe(
        map((response) => response['dist-tags']?.latest),
        catchError(() => of(undefined)),
      );
  }

  private _npmRegistry(name: string): string {
    return `https://registry.npmjs.org/${encodeURIComponent(name)}`;
  }
}
