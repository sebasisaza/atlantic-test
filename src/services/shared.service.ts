import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private productSubject = new BehaviorSubject<string>('');
  private categorySubject = new BehaviorSubject<string>('');

  product$ = this.productSubject.asObservable();
  category$ = this.categorySubject.asObservable();

  updateProduct(product: string) {
    this.productSubject.next(product);
  }

  updateCategory(category: string) {
    this.categorySubject.next(category);
  }
}
