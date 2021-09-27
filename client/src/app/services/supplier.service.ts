import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { catchError, shareReplay } from "rxjs/operators";

import { Supplier } from "../interfaces/supplier";
import { handleError } from "../utils";

@Injectable({
  providedIn: "root",
})
export class SupplierService {
  private suppliersUrl = "/suppliers";

  suppliers$ = this.http
    .get<Supplier[]>(this.suppliersUrl)
    .pipe(shareReplay(1), catchError(handleError));

  constructor(private http: HttpClient) {}
}
