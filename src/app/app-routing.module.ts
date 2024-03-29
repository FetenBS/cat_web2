import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {LoginComponent} from './login/login.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CaddiesComponent} from './caddies/caddies.component';
const routes: Routes = [
	  {path:"products/:p1/:p2",component:ProductsComponent},
	  	{path:"",redirectTo:"products/1/0",pathMatch:"full"},
	  	 {path:"login",component:LoginComponent},
	  	 {path:"product-detail/:url",component:ProductDetailComponent},
	  	  {path:"caddies",component:CaddiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
