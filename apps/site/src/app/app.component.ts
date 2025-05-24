import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserService } from '@foblex/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit {

  public isBrowser = false;

  constructor(
    private renderer: Renderer2,
    private fBrowser: BrowserService,
  ) {
    this.isBrowser = fBrowser.isBrowser();
  }

  public ngOnInit(): void {
    if (this.getPreferredTheme() === 'dark' && !this.isDocumentContainsDarkTheme()) {
      this.renderer.addClass(this.fBrowser.document.documentElement, 'dark');
      this.fBrowser.localStorage.setItem('preferred-theme', 'dark');
    }
  }

  private getPreferredTheme(): string {
    return this.fBrowser.localStorage.getItem('preferred-theme')
      || (this.fBrowser.window.isMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light');
  }

  private isDocumentContainsDarkTheme(): boolean {
    return this.fBrowser.document.documentElement.classList.contains('dark');
  }
}
