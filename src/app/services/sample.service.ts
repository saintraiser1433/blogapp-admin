import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  http = inject(HttpClient);
  loadData$ = this.http.get('https://jsonplaceholder.typicode.com/todos').pipe(takeUntilDestroyed());



  dataSig = toSignal(this.loadData$, { initialValue: [] })


}
