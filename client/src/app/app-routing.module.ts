import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ShellComponent } from "./pages/home/shell.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { PageNotFoundComponent } from "./pages/page-not-found.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "",
        component: ShellComponent,
        children: [
          { path: "welcome", component: WelcomeComponent },
          {
            path: "products",
            loadChildren: "./pages/products/product.module#ProductModule",
          },
          { path: "", redirectTo: "welcome", pathMatch: "full" },
        ],
      },
      { path: "**", component: PageNotFoundComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
