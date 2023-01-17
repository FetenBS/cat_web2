import { Caddy } from "./caddy.model";
import { Product } from "./product.model";

export class ProductItem{
  // id!:string;
 // name!:string;
  price!:number;
  quantity!:number;
    product: Product | undefined;
  caddy: Caddy | undefined ;
}
