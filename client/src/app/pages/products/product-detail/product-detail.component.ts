import { Component, ChangeDetectionStrategy } from "@angular/core";

import { catchError, map, filter } from "rxjs/operators";

import { ProductService } from "../../../services/product.service";
import { Product } from "../../../interfaces/product";
import { combineLatest, of, Subject, Observable } from "rxjs";

@Component({
  selector: "pm-product-detail",
  templateUrl: "./product-detail.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  error$ = new Subject<string>();

  product$: Observable<Product> = this.productService.selectedProduct$.pipe(
    catchError((error) => {
      this.error$.next(error);
      return of(null);
    })
  );

  pageTitle$ = this.product$.pipe(
    map((p: Product) => (p ? `Product Detail for: ${p.productName}` : null))
  );

  productSuppliers$ = this.productService.selectedProductSuppliers$.pipe(
    catchError((error) => {
      this.error$.next(error);
      return of(null);
    })
  );

  vm$ = combineLatest([
    this.product$,
    this.productSuppliers$,
    this.pageTitle$,
  ]).pipe(
    filter(([product]) => !!product),
    map(([product, productSuppliers, pageTitle]) => ({
      product,
      productSuppliers,
      pageTitle,
    }))
  );

  constructor(private productService: ProductService) {}
}
