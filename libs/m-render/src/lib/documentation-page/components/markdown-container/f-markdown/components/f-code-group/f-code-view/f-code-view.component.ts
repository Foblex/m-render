import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { catchError, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HighlightComponent } from './components/highlight.component';
import { parseLanguageFromFileExtension, parseSyntaxLanguage } from './utils/parse-language';
import { IParsedContainerData } from '../../../markdown';
import { PopoverService } from '../../../../../../../common';
import { coerceComponentHeight } from '../f-example-view';
import { copyToClipboard } from '@foblex/mr-common';

@Component({
  selector: 'f-code-view',
  templateUrl: './f-code-view.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'f-code-view',
    '[style.height]': 'height()',
  },
  imports: [
    HighlightComponent,
  ],
})
export class FCodeViewComponent implements OnInit {
  private readonly _httpClient = inject(HttpClient);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _popoverService = inject(PopoverService);

  public readonly data = input<IParsedContainerData>();

  protected readonly height = computed(() => {
    return coerceComponentHeight(this.data()?.height);
  });

  protected readonly content = signal<string>('');
  protected readonly visibleLanguage = signal<string>('');
  protected readonly syntaxLanguage = signal<string>('');

  public ngOnInit(): void {
    this._updateLanguage();
    this._updateNotExistingData(this.data());
    this._updateExistingData(this.data());
  }

  private _updateLanguage(): void {
    const data = this.data();
    const language = data?.language || parseLanguageFromFileExtension(data?.value || '');
    this.syntaxLanguage.set(parseSyntaxLanguage(language));
    this.visibleLanguage.set(language);
  }

  private _updateNotExistingData(data?: IParsedContainerData): void {
    if (data?.isLink) {
      this._loadCodeByLink(data.value);
    }
  }

  private _updateExistingData(data?: IParsedContainerData): void {
    if (!data?.isLink) {
      this.content.set(data?.value || '');
    }
  }

  private _loadCodeByLink(link: string): void {
    if (!link) return;

    this._httpClient.get(link, { responseType: 'text' }).pipe(
      take(1),
      takeUntilDestroyed(this._destroyRef),
      catchError(() => EMPTY),
    ).subscribe((content) => this.content.set(content));
  }

  protected onCopyClick(): void {
    this._copyContentToClipboard(this.content());
  }

  private _copyContentToClipboard(content: string): void {
    copyToClipboard(content).pipe(
      take(1),
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(() => this._popoverService.show('Copied!'));
  }
}

