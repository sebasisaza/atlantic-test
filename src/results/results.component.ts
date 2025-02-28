import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { Product } from '../models/post.model';
import { CommonModule } from '@angular/common';
import { Search } from '../models/search.model';
import { ProductService } from '../services/product.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'results',
  imports: [MatTableModule, CommonModule, MatPaginatorModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit, AfterViewInit {
  receivedData: Search = { product: '', category: '' };

  dataSource = new MatTableDataSource<Product>();
  length: number = 0;

  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'stock',
    'weight',
    'category',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sharedService: SharedService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this._filter();
  }

  ngAfterViewInit(): void {
    this._getData(this.paginator.pageSize, this.paginator.pageIndex, '');
  }

  onPageEvent(pageEvent: PageEvent): void {
    if (this.receivedData.category) {
      this._getDataByCategory(
        pageEvent.pageSize,
        pageEvent.pageIndex,
        this.receivedData.category
      );
      return;
    }
    this._getData(pageEvent.pageSize, pageEvent.pageIndex, '');
  }

  private _filter(): void {
    this.sharedService.data$.subscribe((data) => {
      this.receivedData = data;
      if (this.receivedData.category) {
        this._getDataByCategory(
          this.paginator.pageSize,
          this.paginator.pageIndex,
          this.receivedData.category
        );
        return;
      }
      this._getData(
        this.paginator.pageSize,
        this.paginator.pageIndex,
        this.receivedData.product
      );
    });
  }

  private _getData(limit: number, skip: number, search: string): void {
    this.productService.getProducts(limit, skip, search).subscribe((data) => {
      this.dataSource.data = data.products;
      this.length = data.total;
    });
  }

  private _getDataByCategory(
    limit: number,
    skip: number,
    category: string
  ): void {
    this.productService
      .getProductsByCategory(limit, skip, category)
      .subscribe((data) => {
        this.dataSource.data = data.products;
        this.length = data.total;
      });
  }
}
