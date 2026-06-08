import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterDataRefreshService {

  private refreshSource =
    new Subject<void>();

  refresh$ =
    this.refreshSource.asObservable();

  notifyRefresh(): void {

    this.refreshSource.next();

  }

}