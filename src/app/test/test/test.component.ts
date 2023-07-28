import { Component, OnInit, Signal, computed, effect, inject, signal } from '@angular/core';
import { SampleService } from 'src/app/services/sample.service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  dataService = inject(SampleService);
  datas: any[] = [];
  data = computed(() => {
    return this.dataService.dataSig();
  })
  num1 = signal(2);
  num3 = signal(4);
  title = computed(() => this.num1() + this.num3());
  constructor(private sample: SampleService) {
    effect(() => {
      this.datas
    })

  }



  ngOnInit(): void {


  }
  changeTitle(event: Event) {
    const title: number = parseInt((event.target as HTMLInputElement).value, 10);
    this.num1.set(title)

  }
}
