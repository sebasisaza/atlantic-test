import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from './response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products/';

  constructor(private http: HttpClient) {}

  getProducts(
    limit: number,
    skip: number,
    search: string
  ): Observable<Response> {
    const filters = `search?q=${search}&limit=${limit}&skip=${
      skip * limit
    }&select=id,title,price,stock,weight,category`;
    return this.http.get<Response>(this.apiUrl + filters);
  }

  getCategories(): Observable<string[]> {
    const filters = `category-list`;
    return this.http.get<string[]>(this.apiUrl + filters);
  }

  getProductsByCategory(
    limit: number,
    skip: number,
    category: string
  ): Observable<Response> {
    const filters = `category/${category}?&limit=${limit}&skip=${
      skip * limit
    }&select=id,title,price,stock,weight,category`;
    return this.http.get<Response>(this.apiUrl + filters);
  }
}
