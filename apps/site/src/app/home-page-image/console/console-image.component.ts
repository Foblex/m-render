import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-console-image',
  templateUrl: './console-image.component.html',
  styleUrl: './console-image.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsoleImageComponent implements AfterViewInit {

  private readonly _consoleTextRef = viewChild<ElementRef>('consoleText');
  private readonly _COMMAND = 'npm install @foblex/m-render';
  private _index = 0;

  public ngAfterViewInit(): void {
    this._print();
  }

  private _print(): void {
    setTimeout(() => this._type(), 50);
  }

  private _type(): void {
    const element = this._consoleTextRef()!.nativeElement;
    if (this._index < this._COMMAND.length) {
      element.textContent += this._COMMAND[this._index];
      this._index++;
      setTimeout(() => this._type(), 100);
    } else {
      setTimeout(() => this._reset(), 20000);
    }
  }

  private _reset(): void {
    const element = this._consoleTextRef()!.nativeElement;
    element.textContent = ' ';
    this._index = 0;
    setTimeout(() => this._type(), 2500);
  }
}
