import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { combineLatest, of, BehaviorSubject, forkJoin } from "rxjs";
import { catchError, map, shareReplay, switchMap } from "rxjs/operators";

import { Product } from "../interfaces/product";
import { ProductCategoryService } from "./product-category.service";
import { Supplier } from "../interfaces/supplier";
import { SupplierService } from "./supplier.service";
import { handleError } from "../utils";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsUrl = "/products";

  products$ = this.http
    .get<Product[]>(this.productsUrl)
    .pipe(shareReplay(1), catchError(handleError));

  productsWithCategory$ = forkJoin({
    products: this.products$,
    categories: this.productCategoryService.productCategories$,
  }).pipe(
    map(({ products, categories }) =>
      products.map((p) => ({
        ...p,
        category: categories.find((c) => p.categoryId === c.id).name,
      }))
    ),
    shareReplay(1)
  );

  private productSelectedAction = new BehaviorSubject<number>(0);

  selectedProduct$ = this.productSelectedAction.pipe(
    switchMap((selectedProductId) => {
      return this.http.get<Product>(`${this.productsUrl}/${selectedProductId}`);
    }),
    shareReplay(1),
    catchError(handleError)
  );

  selectedProductSuppliers$ = combineLatest([
    this.selectedProduct$,
    this.supplierService.suppliers$,
  ]).pipe(
    map(([product, suppliers]: [Product, Supplier[]]) =>
      suppliers.filter((supplier) =>
        product ? product.supplierIds.includes(supplier.id) : of(null)
      )
    )
  );

  constructor(
    private http: HttpClient,
    private productCategoryService: ProductCategoryService,
    private supplierService: SupplierService
  ) {}

  changeSelectedProduct(selectedProductId: number | null): void {
    this.productSelectedAction.next(selectedProductId);
  }
}
