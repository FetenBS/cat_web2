import { Component, OnInit } from '@angular/core';
import{ActivatedRoute,Router,NavigationEnd} from  '@angular/router';
import{CatalogueService} from'../catalogue.service';
import{AuthentificationService} from'../services/authentification.service';
import{Product} from '../model/product.model';
import{HttpEventType, HttpResponse,HttpProgressEvent} from '@angular/common/http';
import{CaddyService} from '../services/caddy.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
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
public isAuthenticated!:boolean;

  
  constructor(private router:Router,private route:ActivatedRoute,public catService:CatalogueService,public authService:AuthentificationService,
  public caddyService:CaddyService) { }

  ngOnInit(): void {
	  let url=atob(this.route.snapshot.params['url']);
	this.catService.getProduct(url).subscribe(data=>{
		  this.currentProduct=data;
		   console.log(url); 
	  })
	
}
 onEditPhoto(p:any){

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
	
	getTS(){
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
  onAddProductToCaddy(p:any){
	  
	    if(!this.authService.isAuthenticated){
      this.router.navigateByUrl("/login");
    }
    else{
      this.caddyService. addProductToCaddy(p);
    }
	  
  }
  onProductDetails(currentProduct:Product){
	  let url=btoa(currentProduct._links.product.href);
	  this.router.navigateByUrl("product-detail/"+url);
	  
  }
  onEditProduct(){
	  this.mode=1;
  }
}




