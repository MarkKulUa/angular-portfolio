import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Preloader {
  private isLoadingSignal = signal<boolean>(true);
  public isLoading = this.isLoadingSignal.asReadonly();

  show(): void {
    this.isLoadingSignal.set(true);
  }

  hide(): void {
    this.isLoadingSignal.set(false);
  }
}
