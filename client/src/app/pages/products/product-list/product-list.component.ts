import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { of, Subject, Observable, combineLatest } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  error$ = new Subject<string>();

  products$: Observable<Product[] | null> =
    this.productService.productsWithCategory$.pipe(
      catchError((error) => {
        this.error$.next(error);
        return of(null);
      })
    );

  vm$ = combineLatest([
    this.products$,
    this.productService.selectedProduct$,
  ]).pipe(
    map(([products, product]: [Product[] | null, Product]) => ({
      products,
      productId: product ? product.id : 0,
    }))
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Read the parameter from the route - supports deep linking
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!;
      this.productService.changeSelectedProduct(id);
    });
  }

  onSelected(productId: number): void {
    // Modify the URL to support deep linking
    this.router.navigate(['/products', productId]);
  }
}
