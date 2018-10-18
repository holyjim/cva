import { Component } from '@angular/core';
import { NotifyService } from './core/notify.service';

@Component({
  selector: 'cva-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public notify: NotifyService) { }
}
