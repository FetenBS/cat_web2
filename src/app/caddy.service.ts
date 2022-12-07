import { Injectable } from '@angular/core';
import{Product} from './model/product.model';
@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  constructor() { }
   public addProduct(product:Product){
    this.addProductToCaddy(product.id,product.name,product.currentPrice,product.quantity)
    this.saveCaddy();
  }
  addProductToCaddy(id:number,name:string,price:number,quantity:number){
	  
  }
  saveCaddy(){
	   // let caddy=this.caddies[this.currentCaddyName];
   // localStorage.setItem("myCaddy_"+this.authService.authenticatedUser.username+"_"+this.currentCaddyName,JSON.stringify(caddy));
  }
	  
  }

