import { Component, OnInit } from '@angular/core';
import{CatalogueService} from'../catalogue.service';
import{ActivatedRoute,Router,NavigationEnd} from  '@angular/router';
import{HttpEventType, HttpResponse,HttpProgressEvent} from '@angular/common/http';
import{AuthentificationService} from'../services/authentification.service';
import{Product} from '../model/product.model';
import{CaddyService} from'../services/caddy.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
public products:any;
public editPhoto!:boolean;
public currentProduct:any;
public selectedFiles:any;
public progress!: number;
public currentFileUpload:any;
public title!: String;
public timestamp:number=0;
public mode:number=0;
public currentTime!: number;
public total:number=0;


  constructor(public catService:CatalogueService,private route:ActivatedRoute, private router:Router,
  public authService:AuthentificationService,public caddyService:CaddyService) { 


}

  ngOnInit(): void {
	this.router.events.subscribe((val:any)=>{
	if(val instanceof NavigationEnd){
		let url=val.url;
		//console.log(url);
	
 let p1=this.route.snapshot.params['p1'];
	  if(p1==1){
		 this.title="Sélection";
		 	// console.log(p1)  
	  this.getProducts('/products/search/selectedProducts');
  }
  else if
	  (p1==2){
		  let idCat=this.route.snapshot.params['p2'];
		  this.title="Produit de la categorie"+idCat;
		  this.getProducts('/categories/'+idCat+'/products');
	  }else  if(p1==3){
		    this.title="Produits en Promotion";
		 // let idCat=this.route.snapshot.params['p2'];
		     this.getProducts('/products/search/promoProducts');
		    
	  }
		  else if(p1==4){
			   this.title="Produits dispo";
			// let idCat=this.route.snapshot.params['p2'];
		     this.getProducts('/products/search/dispoProducts');
		  }
		  else if(p1==5){
			   this.title="Recherche";
			 // let idCat=this.route.snapshot.params['p2'];
		    this.getProducts('/products/search/dispoProducts');
		  
	  }
	  }
	  
	
});








  
  	 let p1=this.route.snapshot.params['p1'];
	  if(p1==1){this.getProducts('/products/search/selectedProducts');
		  console.log(p1)  
		  }

  
  }
  
  
  
  
  
  
  
  
  
private getProducts(url:any){
	this.catService.getRessource(url)
	  .subscribe(data=>{
            this.products=data;
        },err=>{
            console.log(err);
        }
            
       )
    }
onEditPhpto(p:any){

this.currentProduct=p;
this.editPhoto=true;

}
onSelectedFile(event:any){
	this.selectedFiles=event.target.files;
}
onUpdateProduct(data:any){
   let url=this.currentProduct._links.self.href;
   this.catService.getRessource(url)
   .subscribe(d=>{
       this.currentProduct=0;
       this.mode=0;
   },err=>{
       console.log(err);
   }
   )}
	
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
		    if (event.total) {
        const total: number = event.total;  
        
        this.progress = Math.round(100 * event.loaded / event.total);
        }
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
       // this.getProducts('/products/search/selectedProducts');
         alert("fin chargement")
        this.timestamp=Date.now();
       ;
      }
    },err=>{
      alert("Problème de chargement..");
    })



    this.selectedFiles = undefined
  }
	
	getTs(){
		return Date.now();
	}
	 public isAdmin(){
      if(this.authService.userAuthenticated){
          if(this.authService.userAuthenticated.roles.indexOf('ADMIN')>-1){
              return true;
          }else{
          return false;}
     }return '';
  }
  onAddProductToCaddy(p:Product):void{
	  
	  this.caddyService.addProductToCaddy(p);
	  
	  
  }
  onProductDetails(p:Product){
	  let url=btoa(p._links.product.href);
	  this.router.navigateByUrl("product-detail/"+url);
	  
  }
 

}


