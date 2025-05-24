import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { F_NPM_VERSION_PROVIDER, INpmVersion } from './domain';
import { catchError } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'f-version',
  templateUrl: './f-version.component.html',
  styleUrls: ['./f-version.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FVersionComponent {
  private readonly _provider = inject(F_NPM_VERSION_PROVIDER);
  private readonly _http = inject(HttpClient);

  protected version = toSignal(
    this.getLocalVersion(this._provider.getNpmVersion()) ||
    this.getNpmVersion(this._provider.getNpmVersion()),
  );

  private getLocalVersion(
    version: INpmVersion | undefined,
  ): Observable<string | undefined> | undefined {
    return version?.value ? of(version?.value) : undefined;
  }

  private getNpmPackage(version: INpmVersion | undefined): string | undefined {
    return version?.npmPackage;
  }

  private getNpmVersion(
    version: INpmVersion | undefined,
  ): Observable<string | undefined> {
    const packageName = this.getNpmPackage(version);
    if (!packageName) {
      return of(undefined);
    }

    return this._http
      .get<{ 'dist-tags': { latest: string } }>(
        this.getNpmRegistry(packageName),
      )
      .pipe(
        map((response) => response['dist-tags']?.latest),
        catchError(() => of(undefined)),
      );
  }

  private getNpmRegistry(name: string): string {
    return `https://registry.npmjs.org/${encodeURIComponent(name)}`;
  }
}
