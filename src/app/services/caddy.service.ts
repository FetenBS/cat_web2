import { Injectable } from '@angular/core';
import { Caddy } from '../model/caddy.model';
import {ProductItem} from '../model/item-product.model';
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
     let  itemProduct=caddy?.items.get(product.id);
     
	
if( itemProduct==undefined){
	itemProduct=new ProductItem();
	 itemProduct.quantity=product.quantity;
	// itemProduct.price=product.currentPrice;
	  //itemProduct.product=product;
	 
}else{
	itemProduct=new ProductItem();
	
	 itemProduct.quantity+=product.quantity;
	 itemProduct.price=product.currentPrice;
	 itemProduct.product=product;
	 if(caddy)
	caddy.items.set(product.id,itemProduct)
}
   
      
      }
      getCurrentCaddy():Caddy{
	
	
		  return this.caddies.get(this.currentCaddyName)!;
	  }}
  
	  
  

