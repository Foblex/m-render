import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  standalone: true,
  imports: [
    RouterLink,
  ],
})
export class NotFoundPageComponent {}
