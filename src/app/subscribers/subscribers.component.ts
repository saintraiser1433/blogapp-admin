import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {
  data: any[] = [];
  constructor(private subscribers: SubscribersService) {
    this.subscribers.loadData().subscribe(val => {
      this.data = val;
    })

  }

  onDelete(i) {
    this.subscribers.deleteSubscribers(i);
  }
}
