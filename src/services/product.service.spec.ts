import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Response } from './response.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://dummyjson.com/products/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const mockResponse: Response = {
      total: 1,
      skip: 0,
      limit: 10,
      products: [
        {
          id: 1,
          title: 'Product 1',
          price: 100,
          stock: 10,
          weight: 1.5,
          category: 'Electronics',
        },
      ],
    };

    service.getProducts(10, 0, 'laptop').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${apiUrl}search?q=laptop&limit=10&skip=0&select=id,title,price,stock,weight,category`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch categories', () => {
    const mockCategories = ['Electronics', 'Furniture', 'Clothing'];

    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${apiUrl}category-list`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should fetch products by category', () => {
    const mockResponse: Response = {
      total: 1,
      skip: 0,
      limit: 10,
      products: [
        {
          id: 2,
          title: 'Product 2',
          price: 200,
          stock: 5,
          weight: 2.0,
          category: 'Furniture',
        },
      ],
    };

    service.getProductsByCategory(10, 0, 'Furniture').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${apiUrl}category/Furniture?&limit=10&skip=0&select=id,title,price,stock,weight,category`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
