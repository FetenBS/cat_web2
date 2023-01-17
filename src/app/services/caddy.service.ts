import { Injectable } from '@angular/core';
import { Caddy } from '../model/caddy.model';
import {ProductItem} from '../model/product-item.model';
import{Product} from '../model/product.model';

type NewType = Caddy;

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
currentCaddyName:string="Caddy1";

public caddies:Map<string,Caddy>=new Map();
  constructor() {
	 let caddy=new Caddy(this.currentCaddyName);
	 this.caddies.set(this.currentCaddyName,caddy);
   }
  
  public addProductToCaddy(product:Product){

      let caddy=this.caddies.get(this.currentCaddyName);
     // let itemProduct:ItemProduct;
      let  Productitem=caddy?.items.get(product.id);
     
	
if( Productitem==undefined){
	Productitem=new ProductItem();
	 Productitem.quantity=+product.quantity;
	 //itemProduct.price=product.currentPrice;
	  //itemProduct.product=product;
	 
}else{
	Productitem=new ProductItem();
	
	 Productitem.quantity+=product.quantity;
	 Productitem.price=product.currentPrice;
	 Productitem.product=product;
	 if(caddy)
	caddy.items.set(product.id,Productitem)
}
   
      
      }
      getCurrentCaddy():Caddy{
	
	
		  return this.caddies.get(this.currentCaddyName)!;
	  }}
  
	  
  

