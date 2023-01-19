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
      let Productitem:ProductItem | undefined;
        Productitem=caddy?.items.get(product.id);
     
	
if( Productitem){
	Productitem=new ProductItem();
	Productitem.quantity+=product.quantity;
	// Productitem.price=product.currentPrice;
	  //Productitem.product=product;
	 
}else{
	Productitem=new ProductItem();
	Productitem.id=product.id;
	Productitem.name=product.name;
	Productitem.quantity=product.quantity;
	Productitem.price=product.currentPrice;
	Productitem.product=product;
	 if(caddy)
	caddy.items.set(product.id,Productitem)
	this.saveCaddies();
}
   
      
      }
      getCurrentCaddy():Caddy{
	
	
		  return this.caddies.get(this.currentCaddyName)!;
	  }
	  
	public getTotal():number{
	let total=0;
	let items:IterableIterator<ProductItem>=this.getCurrentCaddy().items.values();
	for (let pi of items){
	total+=pi.price*pi.quantity;
	}
	return total;
}
	 public saveCaddies(){
		 localStorage.setItem('myCaddies',JSON.stringify(this.caddies));
	 } 
	  
	  }
  
	  
  

