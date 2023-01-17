import {ProductItem} from './item-product.model';
import {Client} from './client.model';

export class Caddy{
  constructor(name:string){this.name=name;}
  public name:string;
  public items:Map<number,ProductItem>=new Map();
  public client!:Client;
 public size :number | undefined;
}
