import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Msg {
  title: string;
  content: string;
  style: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotifyService {

  private _msgSource = new Subject<Msg>();

  msg = this._msgSource.asObservable();

  constructor() { }

  update(title: string, content: string, style: string) {
    const msg: Msg = { title, content, style };
    this._msgSource.next(msg);
  }
  clear() {
    this._msgSource.next(null);
  }
}
