import { Observable, of } from 'rxjs';

export class MarkCodeFocusedBlocksPostProcessor {

  constructor(
    private _window: Window,
  ) {
  }

  public handle(element: HTMLElement): Observable<HTMLElement> {
    const html = element.innerHTML;
    if (!FOCUS_REGEX.test(html)) {
      return of(element);
    }

    element.innerHTML = html.replace(FOCUS_REGEX, (_match, content) => {
      return `<focus class="focused"><div class="inline-focus">${content}</div></focus>`;
    });

    const focused = element.querySelector('.focused');
    if (focused) {
      this._applyOpacity(element.parentElement as HTMLElement);
    }

    return of(element);
  }

  private _applyOpacity(element: HTMLElement) {
    if (!element.classList.contains('focused')) {
      element.style.color = this._createRgbaString(this._getElementColor(element), 0.5);
      element.childNodes.forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          this._applyOpacity(child as HTMLElement);
        }
      });
    } else {
      element.style.color = this._createRgbaString(this._getElementColor(element), 1, true);
    }
  }

  private _getElementColor(element: HTMLElement): string {
    return this._window.getComputedStyle(element).color;
  }

  private _createRgbaString(color: string, opacity: number, isRgb = false): string {
    const [r, g, b, a] = this._getRgbValues(color);
    const alpha = Number(a) || 1;
    return isRgb ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${opacity * alpha})`;
  }

  private _getRgbValues(color: string): RegExpMatchArray {
    return color.match(/\d+/g)!;
  }
}

const FOCUS_REGEX = /ƒƒƒ([\s\S]*?)¢¢¢/g;
