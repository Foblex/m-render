import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FHeadTagService {

  private _document = inject(DOCUMENT);

  public setTitle(title: string): void {
    this._document.title = title || '';
  }

  public setDescription(description: string): void {
    const meta: HTMLMetaElement = this._getDescription() || this._createElement<HTMLMetaElement>('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', description);
  }

  private _getDescription(): HTMLMetaElement | null {
    return this._document.querySelector(`meta[name="description"]`) || null;
  }

  public setCanonical(url: string): void {
    const link: HTMLLinkElement = this._getCanonical() || this._createElement<HTMLLinkElement>('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
  }

  private _getCanonical(): HTMLLinkElement | null {
    return this._document.querySelector(`link[rel="canonical"]`) || null;
  }

  public updateTag(tag: IMetaTag): void {
    const meta = this._getMetaTag(tag) || this._createElement<HTMLMetaElement>('meta');
    meta.setAttribute('property', tag.property);
    meta.setAttribute('content', tag.content);
  }

  private _getMetaTag(tag: IMetaTag): HTMLMetaElement | null {
    return this._document.querySelector(`meta[property="${ tag.property }"]`) || null;
  }

  private _createElement<TElement extends Node>(tag: string): TElement {
    const element = this._document.createElement(tag) as Node;
    const head = this._document.getElementsByTagName('head')[ 0 ];
    head.appendChild(element);

    return element as TElement;
  }
}

export interface IMetaTag {

  property: string;

  content: string;
}
