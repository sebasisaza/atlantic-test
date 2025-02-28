import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'search',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  title = 'atlantic-test';

  search: FormGroup;

  categories$: Observable<string[]> = of([]);

  constructor(
    private sharedService: SharedService,
    private productService: ProductService
  ) {
    this.search = new FormGroup({
      product: new FormControl(''),
      category: new FormControl(''),
    });
  }

  public ngOnInit(): void {
    this.categories$ = this.productService.getCategories();
  }

  public onSearch(): void {
    const productInput = this.search.controls['product'].value;
    const categorySelected = this.search.controls['category'].value;
    this.sharedService.updateData({
      product: productInput,
      category: categorySelected,
    });
  }
}
