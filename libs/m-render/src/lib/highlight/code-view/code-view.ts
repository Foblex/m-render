import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { catchError, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AVAILABLE_LANGUAGES, Highlight } from '../index';
import { IParsedContainerData } from '../../documentation-page';
import { copyToClipboard, PopoverService } from '../../common';

@Component({
  selector: 'code-view',
  templateUrl: './code-view.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'code-view',
    '[style.height]': 'height()',
  },
  imports: [
    Highlight,
  ],
})
export class CodeView implements OnInit {
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

function coerceComponentHeight(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  value = Number(value);
  if (value) {
    return value + 'px';
  }
  return undefined;
}


function parseLanguageFromFileExtension(url: string): string {
  const match = url.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);

  if (match) {
    let extension = match[1];
    if (extension === 'css') {
      extension = 'scss';
    }
    return extension;
  }
  return '';
}

function parseSyntaxLanguage(language: string): string {
  let result: string;
  switch (language) {
    case 'js':
    case 'javascript':
      result = 'javascript';
      break;
    case 'ts':
    case 'typescript':
    case 'angular-ts':
      result = 'angular-ts';
      break;
    case 'html':
    case 'angular-html':
      result = 'angular-html';
      break;
    default:
      result = extractLanguage(language);
  }
  if(!AVAILABLE_LANGUAGES.includes(result)) {
    result = 'text';
  }
  return result;
}

function extractLanguage(language: string): string {
  const match = language.match(/^([^\s\[]+)/);
  return match ? match[1].toLowerCase() : language;
}
