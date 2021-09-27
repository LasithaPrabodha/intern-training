import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { ProductCategory } from "../interfaces/product-category";
import { handleError } from "../utils";

@Injectable({
  providedIn: "root",
})
export class ProductCategoryService {
  private productCategoriesUrl = "/productCategories";

  productCategories$ = this.http
    .get<ProductCategory[]>(this.productCategoriesUrl)
    .pipe(catchError(handleError));

  constructor(private http: HttpClient) {}
}
