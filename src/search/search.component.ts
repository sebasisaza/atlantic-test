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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'search',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSlideToggleModule,
  ],
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
      searchByProduct: new FormControl(true),
      searchByCategory: new FormControl(false),
    });
  }

  public ngOnInit(): void {
    this.categories$ = this.productService.getCategories();
  }

  public onChangeToggle(
    changedControl: 'searchByProduct' | 'searchByCategory',
    isChecked: boolean
  ): void {
    if (!isChecked) {
      this.search.patchValue({
        searchByProduct: changedControl === 'searchByProduct' ? false : true,
        searchByCategory: changedControl === 'searchByCategory' ? false : true,
      });
    } else {
      this.search.patchValue({
        searchByProduct: changedControl === 'searchByProduct',
        searchByCategory: changedControl === 'searchByCategory',
      });
    }
  }

  public onReset(): void {
    this.search.controls['product'].setValue('');
    this.search.controls['category'].setValue('');
    this.search.controls['searchByProduct'].setValue(true);
    this.search.controls['searchByCategory'].setValue(false);
  }

  public onSearch(): void {
    const productInput = this.search.controls['product'].value;
    const categorySelected = this.search.controls['category'].value;

    if (this.search.controls['searchByProduct'].value) {
      this.sharedService.updateProduct(productInput);
      return;
    }

    if (this.search.controls['searchByCategory'].value) {
      this.sharedService.updateCategory(categorySelected);
      return;
    }
  }
}
