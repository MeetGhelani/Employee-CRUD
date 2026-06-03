import { Injectable, signal } from '@angular/core';

export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message = signal('');

  visible = signal(false);

  type =
    signal<ToastType>('success');

  private hideTimeout:
    ReturnType<typeof setTimeout> | null = null;

  private clearTimeout:
    ReturnType<typeof setTimeout> | null = null;

  show(
    message: string,
    type: ToastType = 'success'
  ) {

    if (this.hideTimeout) {

      clearTimeout(this.hideTimeout);

    }

    if (this.clearTimeout) {

      clearTimeout(this.clearTimeout);

    }

    this.message.set(message);

    this.type.set(type);

    this.visible.set(true);

    this.hideTimeout =
      setTimeout(() => {

        this.close();

      }, 3000);

  }

  close() {

    this.visible.set(false);

    this.clearTimeout =
      setTimeout(() => {

        this.message.set('');

      }, 300);

  }

}