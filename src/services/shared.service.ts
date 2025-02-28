import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Search } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private dataSubject = new BehaviorSubject<Search>({
    product: '',
    category: '',
  });

  data$ = this.dataSubject.asObservable();

  updateData(newData: Search) {
    this.dataSubject.next(newData);
  }
}
