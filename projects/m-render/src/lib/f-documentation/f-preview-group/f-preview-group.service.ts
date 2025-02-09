import { Injectable } from '@angular/core';
import { FPreviewBase } from '../f-preview/f-preview-base';

@Injectable()
export class FPreviewGroupService {

  private _fPreviews: FPreviewBase[] = [];
  private _originalOrder: Map<HTMLElement, Node[]> | null = null;

  public add(fPreview: FPreviewBase): void {
    this._fPreviews.push(fPreview);
  }

  public remove(fPreview: FPreviewBase): void {
    this._fPreviews = this._fPreviews.filter(preview => preview !== fPreview);
  }

  public sortByDate(sort: boolean): void {
    if (sort) {
      this._applyByDateOrder();
    } else {
      this._applyOriginalOrder();
    }
  }

  private _setOriginalOrder(): void {
    this._originalOrder = new Map();
    this._fPreviews.forEach((x) => {
      const parentElement = x.hostElement.parentElement;
      if (parentElement) {
        const childrenArray = Array.from(parentElement.children);
        this._originalOrder!.set(parentElement, childrenArray);
      }
    });
  }

  private _getOrderByDate(): FPreviewBase[] {
    return this._fPreviews
      .slice()
      .sort((a, b) => {
        const dateA = a.date ? a.date.getTime() : Number.MIN_SAFE_INTEGER;
        const dateB = b.date ? b.date.getTime() : Number.MIN_SAFE_INTEGER;
        return dateB - dateA;
      });
  }

  private _applyByDateOrder(): void {
    this._setOriginalOrder();
    this._getOrderByDate().forEach((x) => {
      const parent = x.hostElement.parentElement;
      parent?.appendChild(x.hostElement);
    });
  }

  private _applyOriginalOrder(): void {
    this._originalOrder!.forEach((originalChildren, parentElement) => {
      originalChildren.forEach(child => parentElement.appendChild(child));
    });
  }

  public filterBy(filterKey: string, _allKey: string): void {
    this._resetLastActiveFilter();

    if (filterKey === _allKey) {
      return;
    }
    this._fPreviews.forEach((x) => {
      if (x.filterKey !== filterKey) {
        x.hostElement.style.display = 'none';
      }
    });
  }

  private _resetLastActiveFilter(): void {
    this._fPreviews.forEach((x) => {
      x.hostElement.style.display = 'block';
    });
  }
}
