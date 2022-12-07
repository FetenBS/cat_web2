import { Component, OnInit } from '@angular/core';
import {CatalogueService} from './catalogue.service'
import{Router,ActivatedRoute} from  '@angular/router';
import{AuthentificationService} from'./services/authentification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	public categories:any;
	public products:any;
	public currentCategories:any;
	constructor(private catService : CatalogueService,private router:Router, private authService:AuthentificationService){}
  ngOnInit(): void {
     this.authService.loadAuthentificatedUserFromLocalStorage();
      this.getCategories();
  }
private getCategories(){
	this.catService.getRessource("/categories")
	  .subscribe(data=>{
            this.categories=data;
        },err=>{
            console.log(err);
        }
            
            
            
        
                )}
    
    getProductsByCat(c:any){
		this.currentCategories=c;
		this.router.navigateByUrl('/products/2/'+c.id);
		
   
}
onSelectedProducts(){
	 this.currentCategories=undefined;
        this.router.navigateByUrl('/products/1/0');
}
onProductsPromo(){
	this.currentCategories=undefined;
	 this.router.navigateByUrl('/products/3/0');
}
onProductsDispo(){
	this.currentCategories=undefined;
	 this.router.navigateByUrl('/products/4/0');
}
onLogout(){
	//this.authService.removeTokenFromLocalStorage();
	this.router.navigateByUrl('/login');
}

}